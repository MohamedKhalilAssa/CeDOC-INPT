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

        // Skip filter for paths that don't require authentication
        if (shouldSkipFilter(request)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            // Extract and validate the access token
            String accessToken = extractAccessToken(request);

            if (accessToken != null) {
                processAccessToken(accessToken, request);
            }
            request.setAttribute("isAccessTokenValid", true);
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
        String method = request.getMethod();
        return (!path.contains("/api/auth/logout") && !path.contains("/api/auth/check")) &&
                (method.equalsIgnoreCase("OPTIONS") ||
                        path.startsWith("/api/auth/") ||
                        path.startsWith("/api/guest/") ||
                        path.startsWith("/images/") ||
                        (method.equalsIgnoreCase("GET") && path.startsWith("/api/formations")) ||
                        path.startsWith("/api/utilisateurs/assign-role") ||
                        path.startsWith("/api/utilisateurs/set-role"));
    }
}
