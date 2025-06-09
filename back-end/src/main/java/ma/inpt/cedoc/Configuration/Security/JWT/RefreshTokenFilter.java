package ma.inpt.cedoc.Configuration.Security.JWT;

import java.io.IOException;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.Helpers.UtilFunctions;
import ma.inpt.cedoc.model.DTOs.auth.AuthenticationResponse;
import ma.inpt.cedoc.model.DTOs.auth.TokenRefreshRequest;
import ma.inpt.cedoc.model.entities.auth.Token;
import ma.inpt.cedoc.model.enums.auth.TokenEnum;
import ma.inpt.cedoc.service.auth.AuthenticationService;
import ma.inpt.cedoc.service.auth.TokenService;

@RequiredArgsConstructor
@Component
public class RefreshTokenFilter extends OncePerRequestFilter {
    private static final Logger logger = LoggerFactory.getLogger(RefreshTokenFilter.class);

    private final JwtUtil jwtUtil;
    private final TokenService tokenService;
    private final UserDetailsService userDetailsService;

    private AuthenticationService authenticationService;

    @Autowired
    @Lazy
    public void setAuthenticationService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain) throws ServletException, IOException {

        // Skip filter for paths that don't require authentication
        if (shouldSkipFilter(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        // Only attempt refresh if no authentication exists
        if (SecurityContextHolder.getContext().getAuthentication() != null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Extract refresh token from cookies
            String refreshToken = extractRefreshToken(request);
            if (refreshToken != null && !refreshToken.trim().isEmpty()) {
                RefreshResult result = handleRefreshToken(refreshToken, request, response);
                if (result.success) {
                    logger.debug("Token refresh successful");
                    filterChain.doFilter(request, response);
                    return;
                } else {
                    // Send specific error response based on failure type
                    logger.debug("Token refresh failed: {}", result.errorMessage);

                    // Revoke the token in database if it exists
                    revokeTokenInDatabase(refreshToken);

                    // Clear the refresh token cookie properly
                    clearRefreshTokenCookie(response);

                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.setContentType("application/json");
                    response.getWriter().write(String.format(
                            "{\"error\":\"%s\",\"message\":\"%s\",\"requiresLogin\":true}",
                            result.errorType, result.errorMessage));
                    return;
                }
            }

            // If no refresh token available, continue with the request
            // (other filters/handlers will deal with authorization)
            filterChain.doFilter(request, response);
            return;
        } catch (Exception e) {
            logger.error("Token refresh error: {}", e.getMessage());

            // Try to revoke token and clear cookie on any error
            String refreshToken = extractRefreshToken(request);
            if (refreshToken != null && !refreshToken.trim().isEmpty()) {
                revokeTokenInDatabase(refreshToken);
            }
            clearRefreshTokenCookie(response);

            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"error\":\"token_error\",\"message\":\"Token processing failed\",\"requiresLogin\":true}");
            return;
        }
    }

    private boolean shouldSkipFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        String method = request.getMethod();

        // Never skip logout and check endpoints - they need token processing
        if (path.contains("/api/auth/logout") || path.contains("/api/auth/check")) {
            return false;
        }

        // Skip these public endpoints and auth paths
        return method.equalsIgnoreCase("OPTIONS") ||
                path.startsWith("/api/auth/") ||
                path.startsWith("/api/guest/") ||
                path.startsWith("/images/") ||
                (method.equalsIgnoreCase("GET") && path.equals("/api/formations")) ||
                (method.equalsIgnoreCase("GET") && path.equals("/api/sujets/chefs-sujets"));
    }

    private String extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(UtilFunctions.extractCookie(request, "refresh_token"))
                .map(Cookie::getValue)
                .orElse(null);
    }

    private RefreshResult handleRefreshToken(String refreshToken, HttpServletRequest request,
            HttpServletResponse response)
            throws IOException {
        try {
            // Find the refresh token entity in the database
            Token refreshTokenEntity = tokenService.findByTokenSafe(refreshToken);

            // Check if refresh token exists and is of correct type
            if (refreshTokenEntity == null || refreshTokenEntity.getTokenType() != TokenEnum.REFRESH) {
                logger.debug("Refresh token not found or invalid type");
                return RefreshResult.failure("invalid_refresh_token", "Refresh token not found or invalid");
            }

            // Check if token is expired or revoked in database
            if (refreshTokenEntity.isExpired() || refreshTokenEntity.isRevoked()) {
                logger.debug("Refresh token is expired or revoked");
                return RefreshResult.failure("refresh_token_expired", "Refresh token is expired or revoked");
            }

            // Validate the refresh token with JWT
            if (!jwtUtil.isRefreshTokenValid(refreshTokenEntity.getToken())) {
                logger.warn("Invalid refresh token JWT - token is malformed or expired");
                return RefreshResult.failure("invalid_refresh_token", "Refresh token is malformed or invalid");
            }

            // Generate new tokens
            AuthenticationResponse authResponse = authenticationService
                    .refreshToken(new TokenRefreshRequest(refreshToken), response);

            if (authResponse.getAccessToken() != null) {
                // Add the new access token to the response
                response.addHeader(HttpHeaders.AUTHORIZATION,
                        JwtUtil.AUTHORIZATION_PREFIX + authResponse.getAccessToken());

                UserDetails user = userDetailsService
                        .loadUserByUsername(jwtUtil.extractSubject(authResponse.getAccessToken()));

                // Create authentication token and set in security context
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        user,
                        null,
                        user.getAuthorities());

                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
                logger.debug("Authentication successful for user: {}", user.getUsername());
                return RefreshResult.success();
            } else {
                logger.debug("Failed to generate new access token");
                return RefreshResult.failure("token_refresh_failed", "Failed to refresh tokens");
            }
        } catch (Exception e) {
            logger.error("Unexpected error during token refresh: {}", e.getMessage());
            return RefreshResult.failure("server_error", "Internal server error during token refresh");
        }
    }

    /**
     * Helper method to properly clear the refresh token cookie
     */
    private void clearRefreshTokenCookie(HttpServletResponse response) {

        // Clear with api path (in case it was set with /api path)
        Cookie clearRefreshToken1 = new Cookie("refresh_token", "");
        clearRefreshToken1.setHttpOnly(true);
        clearRefreshToken1.setSecure(true);
        clearRefreshToken1.setPath("/api/");
        clearRefreshToken1.setMaxAge(0);
        response.addCookie(clearRefreshToken1);

        // Clear with empty path (fallback)
        Cookie clearRefreshToken2 = new Cookie("refresh_token", "");
        clearRefreshToken2.setHttpOnly(true);
        clearRefreshToken2.setSecure(true);
        clearRefreshToken2.setMaxAge(0);
        response.addCookie(clearRefreshToken2);

        response.addHeader("Set-Cookie",
                "refresh_token=; Path=/api/; HttpOnly; Secure; Max-Age=0; SameSite=None");

        logger.debug("Refresh token cookie cleared with multiple strategies");
    }

    /**
     * Helper method to revoke token in database
     */
    private void revokeTokenInDatabase(String refreshToken) {
        try {
            Token tokenEntity = tokenService.findByTokenSafe(refreshToken);
            if (tokenEntity != null && !tokenEntity.isRevoked()) {
                tokenService.revokeToken(tokenEntity);
                logger.debug("Token revoked in database");
            }
        } catch (Exception e) {
            logger.warn("Failed to revoke token in database: {}", e.getMessage());
        }
    }

    // Helper class to hold refresh result
    private static class RefreshResult {
        final boolean success;
        final String errorType;
        final String errorMessage;

        RefreshResult(boolean success, String errorType, String errorMessage) {
            this.success = success;
            this.errorType = errorType;
            this.errorMessage = errorMessage;
        }

        static RefreshResult success() {
            return new RefreshResult(true, null, null);
        }

        static RefreshResult failure(String errorType, String errorMessage) {
            return new RefreshResult(false, errorType, errorMessage);
        }
    }
}
