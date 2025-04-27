package ma.inpt.cedoc.web.authentication;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.auth.AuthenticationResponse;
import ma.inpt.cedoc.model.DTOs.auth.LoginRequest;
import ma.inpt.cedoc.model.DTOs.auth.RegisterRequest;
import ma.inpt.cedoc.model.DTOs.auth.TokenRefreshRequest;
import ma.inpt.cedoc.service.auth.AuthenticationService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    // for registering new User
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request,
            HttpServletResponse response) {
        return ResponseEntity.ok(authenticationService.register(request, response));
    }

    // for logging in
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request,
            HttpServletResponse response) {
        System.out.println(request);
        try {
            AuthenticationResponse authResponse = authenticationService.login(request, response);
            return ResponseEntity.ok(authResponse);
        }
        // CATCHING ERRORS
        catch (BadCredentialsException e) {
            AuthenticationResponse authResponse = AuthenticationResponse.builder()
                    .statusCode(HttpServletResponse.SC_UNAUTHORIZED)
                    .message("Email ou mot de passe incorrect")
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
        } catch (Exception e) {
            AuthenticationResponse authResponse = AuthenticationResponse.builder()
                    .statusCode(HttpServletResponse.SC_BAD_REQUEST)
                    .message("Probleme de connexion: " + e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refresh(HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        // System.out.println("refresh");
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if ("refresh_token".equals(cookie.getName())) {
                refreshToken = cookie.getValue();
                break;
            }
        }
        TokenRefreshRequest tokenRefreshRequest = TokenRefreshRequest.builder().refreshToken(refreshToken).build();
        System.out.println(tokenRefreshRequest.getRefreshToken());
        return ResponseEntity.ok(authenticationService.refreshToken(tokenRefreshRequest, response));
    }

}
