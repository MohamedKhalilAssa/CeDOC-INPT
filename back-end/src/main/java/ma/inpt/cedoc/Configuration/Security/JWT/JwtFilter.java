package ma.inpt.cedoc.Configuration.Security.JWT;

import java.io.IOException;

import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        // GET necessary data from the header
        final String authHeader = request.getHeader("Authorization");
        final String jwt;
        // GET the user email
        final String userSubject;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        }
    }

}
