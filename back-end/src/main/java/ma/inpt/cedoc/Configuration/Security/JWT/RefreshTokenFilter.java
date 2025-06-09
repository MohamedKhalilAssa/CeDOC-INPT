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

import io.jsonwebtoken.JwtException;
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
            if (refreshToken != null) {
                boolean refreshSuccessful = handleRefreshToken(refreshToken, request, response);
                if (refreshSuccessful) {
                    logger.debug("Token refresh successful");
                    filterChain.doFilter(request, response);
                    return;
                }
            } // If we get here, both access token and refresh token failed
            logger.debug("Authentication failed - no valid tokens");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"error\":\"token_expired\",\"message\":\"Both access and refresh tokens are expired or invalid\",\"requiresLogin\":true}");
            return;
        } catch (Exception e) {
            logger.error("Token refresh error: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"error\":\"token_error\",\"message\":\"Token processing failed\",\"requiresLogin\":true}");
            return;
        }
    }

    // HELPER METHODS
    private boolean shouldSkipFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        String method = request.getMethod();
        return (!path.contains("/api/auth/logout") && !path.contains("/api/auth/check")) &&
                (method.equalsIgnoreCase("OPTIONS") ||
                        path.startsWith("/api/auth/") ||
                        path.startsWith("/api/guest/") ||
                        path.startsWith("/images/") ||
                        (method.equalsIgnoreCase("GET") && path.equals("/api/formations")) ||
                        (method.equalsIgnoreCase("GET") && path.equals("/api/chefs-equipe/chefs-sujets")) ||
                        path.startsWith("/api/utilisateurs/assign-role") ||
                        path.startsWith("/api/utilisateurs/set-role") ||
                        path.startsWith("/uploads/formations/")) ;
    }

    private String extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(UtilFunctions.extractCookie(request, "refresh_token"))
                .map(Cookie::getValue)
                .orElse(null);
    }

    private boolean handleRefreshToken(String refreshToken, HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        try {
            Token refreshTokenEntity = tokenService.findByToken(refreshToken);

            // Check if refresh token exists and is of correct type
            if (refreshTokenEntity == null || refreshTokenEntity.getTokenType() != TokenEnum.REFRESH) {
                logger.debug("Refresh token not found or invalid type");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"error\":\"invalid_refresh_token\",\"message\":\"Refresh token not found or invalid\",\"requiresLogin\":true}");
                return false;
            }

            // Check if token is expired or revoked in database
            if (refreshTokenEntity.isExpired() || refreshTokenEntity.isRevoked()) {
                logger.debug("Refresh token is expired or revoked");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"error\":\"refresh_token_expired\",\"message\":\"Refresh token is expired or revoked\",\"requiresLogin\":true}");
                return false;
            }

            // Validate the refresh token with JWT
            try {
                jwtUtil.validate(refreshTokenEntity.getToken());
            } catch (JwtException e) {
                logger.warn("Invalid refresh token JWT: {}", e.getMessage());
                // Revoke the invalid token
                tokenService.revokeToken(refreshTokenEntity);
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"error\":\"invalid_refresh_token\",\"message\":\"Refresh token is malformed or invalid\",\"requiresLogin\":true}");
                return false;
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
                return true;
            } else {
                logger.debug("Failed to generate new access token");
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.setContentType("application/json");
                response.getWriter().write(
                        "{\"error\":\"token_refresh_failed\",\"message\":\"Failed to refresh tokens\",\"requiresLogin\":true}");
                return false;
            }
        } catch (Exception e) {
            logger.error("Unexpected error during token refresh: {}", e.getMessage());
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            response.setContentType("application/json");
            response.getWriter().write(
                    "{\"error\":\"server_error\",\"message\":\"Internal server error during token refresh\",\"requiresLogin\":true}");
            return false;
        }
    }
}
