package ma.inpt.cedoc.Configuration.Security.JWT;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.enums.auth.TokenEnum;
import ma.inpt.cedoc.service.auth.TokenService;

@Component
@RequiredArgsConstructor
public class AccessTokenFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final TokenService tokenService;

    private static final Logger logger = LoggerFactory.getLogger(AccessTokenFilter.class);

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // Log the incoming request path
        logger.debug("Processing request: {} {}", request.getMethod(), request.getServletPath());

        // Skip filter for paths that don't require authentication
        if (shouldSkipFilter(request)) {
            System.out.println("Skipping filter for path: " + request.getServletPath());
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Extract and validate the access token
            String accessToken = extractAccessToken(request);

            if (accessToken != null) {
                processAccessToken(accessToken, request);
            }

            filterChain.doFilter(request, response);

        } catch (JwtException e) {
            logger.error("JWT validation error: {}", e.getMessage());
            SecurityContextHolder.clearContext();
            // Continue to refresh token filter
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            logger.error("Authentication error: {}", e.getMessage());
            SecurityContextHolder.clearContext();
            filterChain.doFilter(request, response);
        }
    }

    // helper

    private String extractAccessToken(HttpServletRequest request) {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (authHeader == null || !authHeader.startsWith(JwtUtil.AUTHORIZATION_PREFIX)) {
            return null;
        }

        return authHeader.substring(JwtUtil.AUTHORIZATION_PREFIX.length());
    }

    private void processAccessToken(String accessToken, HttpServletRequest request) {
        // Extract subject from token
        String userSubject = jwtUtil.extractSubject(accessToken);
        UserDetails user = userDetailsService.loadUserByUsername(userSubject);

        // Skip if subject is null or authentication is already set
        if (userSubject == null || SecurityContextHolder.getContext().getAuthentication() != null) {
            return;
        }

        // Validate token in database
        var dbToken = tokenService.findByTokenAndNonExpiredOrRevoked(accessToken);
        boolean isTokenValid = dbToken != null && dbToken.getTokenType() == TokenEnum.BEARER
                && jwtUtil.isTokenValid(accessToken, user);

        if (!isTokenValid) {
            logger.debug("Token not found in database or is revoked/expired/invalid");
            return;
        }

        // Load user details and validate token

        if (jwtUtil.isTokenValid(accessToken, user)) {
            // Create authentication token and set in security context
            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    user,
                    null,
                    user.getAuthorities());

            authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authToken);
            logger.debug("Authentication successful for user: {}", userSubject);
        }
    }

    private boolean shouldSkipFilter(HttpServletRequest request) {
        String path = request.getServletPath();
        // Skip authentication endpoints except logout and check
        return (path.contains("/images") || path.contains("/api/auth") &&
                !(path.contains("/api/auth/logout") || path.contains("/api/auth/check"))) ||
                path.contains("/api/guest");
    }
}
