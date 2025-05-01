package ma.inpt.cedoc.web.authentication;

import java.io.IOException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.auth.AuthenticationResponse;
import ma.inpt.cedoc.model.DTOs.auth.LoginRequest;
import ma.inpt.cedoc.model.DTOs.auth.RegisterRequest;
import ma.inpt.cedoc.model.DTOs.auth.TokenRefreshRequest;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.service.auth.AuthenticationService;
import ma.inpt.cedoc.service.auth.EmailVerificationService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final EmailVerificationService emailVerificationService;

    // for registering new User
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request,
            HttpServletResponse response) {
        try {
            AuthenticationResponse authResponse = authenticationService.register(request, response);
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
                    .message("Probleme lors de l'inscription: " + e.getMessage())
                    .build();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(authResponse);
        }
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
        try {
            String refreshToken = null;
            Cookie[] cookies = request.getCookies();
            for (Cookie cookie : cookies) {
                if ("refresh_token".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }

            if (refreshToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(AuthenticationResponse.builder().statusCode(
                                HttpStatus.UNAUTHORIZED.value())
                                .message("Refresh token introuvable").build());
            }

            TokenRefreshRequest tokenRefreshRequest = TokenRefreshRequest.builder().refreshToken(refreshToken).build();

            return ResponseEntity.ok(authenticationService.refreshToken(tokenRefreshRequest, response));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(AuthenticationResponse.builder().statusCode(
                            HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Erreur de rafraichissement du token: " + e.getMessage()).build());
        }
    }

    @PostMapping("/email/send-verification")
    public ResponseEntity<AuthenticationResponse> sendVerificationMail(@RequestParam String email) {
        try {
            emailVerificationService.resendVerificationToken(email);
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .statusCode(HttpStatus.OK.value())
                            .message("Email de vérification envoyé avec succès")
                            .build());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    AuthenticationResponse.builder()
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .message("Email invalide ou déjà vérifié : " + e.getMessage())
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    AuthenticationResponse.builder()
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Erreur lors de l'envoi de l'email : " + e.getMessage())
                            .build());
        }
    }

    @GetMapping("/email/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam("id") long userId, @RequestParam("t") String token) {
        try {
            Utilisateur verifiedUser = emailVerificationService.verifyEmail(userId, token);
            return ResponseEntity.ok(verifiedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(
                    AuthenticationResponse.builder()
                            .statusCode(HttpStatus.BAD_REQUEST.value())
                            .message("Lien de vérification invalide ou expiré : " + e.getMessage())
                            .build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                    AuthenticationResponse.builder()
                            .statusCode(HttpStatus.INTERNAL_SERVER_ERROR.value())
                            .message("Erreur lors de la vérification de l'email : " + e.getMessage())
                            .build());
        }
    }
}
