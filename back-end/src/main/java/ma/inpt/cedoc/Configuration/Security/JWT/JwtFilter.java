package ma.inpt.cedoc.Configuration.Security.JWT;

import java.io.IOException;

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
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.authRepositories.TokenRepository;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
            @NonNull HttpServletResponse response,
            @NonNull FilterChain filterChain)
            throws ServletException, IOException {
        // Log the incoming request path
        System.out.println("Request path FROM JWT FILTER: " + request.getServletPath());
        // not execute it when the path is guest
        if (request.getServletPath().contains("/api/auth") || request.getServletPath().contains("/api/guest")) {
            filterChain.doFilter(request, response);
            return;
        }
        // GET necessary data from the header
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String jwt;
        // GET the user email
        final String userSubject;
        // Check if the header exists
        if (authHeader == null || !authHeader.startsWith(JwtUtil.AUTHORIZATION_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }
        jwt = authHeader.substring(JwtUtil.AUTHORIZATION_PREFIX.length());
        userSubject = jwtUtil.extractSubject(jwt);
        // Check if the subject is there and if the user is already authenticated
        if (userSubject != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails userDetails = this.userDetailsService.loadUserByUsername(userSubject);
            var isTokenValid = tokenRepository.findByToken(jwt)
                    .map(t -> !t.isExpired() && !t.isRevoked())
                    .orElse(false);
            // Check if the token is valid
            if (jwtUtil.isTokenValid(jwt, userDetails) || isTokenValid) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities());
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                // authenticate the user
                SecurityContextHolder.getContext().setAuthentication(authToken);

            }
        }
        filterChain.doFilter(request, response);
    }

}
