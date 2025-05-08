package ma.inpt.cedoc.Configuration.Security.JWT;

import java.io.IOException;
import java.util.Optional;

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
import ma.inpt.cedoc.service.auth.AuthenticationService;
import ma.inpt.cedoc.service.auth.TokenService;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final TokenService tokenService;

    private AuthenticationService authenticationService;

    @Autowired
    @Lazy
    public void setAuthenticationService(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // Log the incoming request path
        System.out.println("Authenticated Request path : " + request.getServletPath() + " Request method : "
                + request.getMethod());
        // not execute it when the path is guest
        if ((request.getServletPath().contains("/api/auth") && !(request.getServletPath().contains("/api/auth/logout")
                || request.getServletPath().contains("/api/auth/check")))
                || request.getServletPath().contains("/api/guest")) {
            filterChain.doFilter(request, response);
            return;
        }
        boolean isAccessTokenValid = false;
        // GET the user email
        final String userSubject;
        // GET THE TOKENS
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String accessToken = (authHeader != null && authHeader.startsWith(JwtUtil.AUTHORIZATION_PREFIX))
                ? authHeader.substring(JwtUtil.AUTHORIZATION_PREFIX.length())
                : null;

        String refreshToken = Optional.ofNullable(UtilFunctions.extractCookie(request, "refresh_token"))
                .map(Cookie::getValue)
                .orElse(null);

        if (accessToken == null && refreshToken == null) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            userSubject = jwtUtil.extractSubject(accessToken);
            // Check if the subject is there and if the user is already authenticated
            if (userSubject != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                isAccessTokenValid = useAccessToken(accessToken, userSubject, request);
            }
        } catch (JwtException e) {
            System.out.println("Invalid JWT: " + e.getMessage());
            isAccessTokenValid = false;
            if (accessToken != null)
                tokenService.findAndRevokeToken(accessToken);
        } catch (Exception e) {
            isAccessTokenValid = false;
        }
        if (!isAccessTokenValid) {
            // Check for cookie of refresh_token
            var refreshTokenFromDB = tokenService.findByToken(refreshToken);
            if (refreshTokenFromDB != null && !refreshTokenFromDB.isExpired() && !refreshTokenFromDB.isRevoked()) {
                setAuthenticationService(authenticationService);
                AuthenticationResponse authResponse = authenticationService
                        .refreshToken(new TokenRefreshRequest(refreshToken), response);
                if (authResponse.getAccessToken() != null) {
                    response.addHeader(HttpHeaders.AUTHORIZATION,
                            JwtUtil.AUTHORIZATION_PREFIX + authResponse.getAccessToken());

                    String newUserSubject = jwtUtil.extractSubject(authResponse.getAccessToken());
                    useAccessToken(authResponse.getAccessToken(), newUserSubject, request);
                }
            } else {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                        "Refresh token non valide ou introuvable");
                return;
            }

        }
        filterChain.doFilter(request, response);

    }

    // helper

    private boolean useAccessToken(String jwt, String userSubject, HttpServletRequest request) {
        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userSubject);
        var isTokenValid = tokenService.findByTokenAndNonExpiredOrRevoked(jwt) != null;
        // Check if the token is valid
        if (jwtUtil.isTokenValid(jwt, userDetails) && isTokenValid) {

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities());
            authToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(request));
            // authenticate the user
            SecurityContextHolder.getContext().setAuthentication(authToken);
            return true;
        }
        return false;
    }

}
