package ma.inpt.cedoc.web.authentication;

import java.io.IOException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurDTO;
import ma.inpt.cedoc.model.DTOs.auth.AuthenticationResponse;
import ma.inpt.cedoc.model.DTOs.auth.EmailVerificationRequest;
import ma.inpt.cedoc.model.DTOs.auth.LoginRequest;
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
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid UtilisateurDTO request,
            HttpServletResponse response) {
        try {
            AuthenticationResponse authResponse = authenticationService.register(request, response);
            return ResponseEntity.ok(authResponse);
        }
        // CATCHING ERRORS
        catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.UNAUTHORIZED, "Probleme lors de l'inscription");
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
        catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.UNAUTHORIZED, "Probleme de connexion");
        }
    }

    // logout

    @PostMapping("/logout")
    public ResponseEntity<AuthenticationResponse> logout(HttpServletResponse response) {
        try {
            AuthenticationResponse authResponse = authenticationService.logout(response);
            return ResponseEntity.ok(authResponse);
        }
        // CATCHING ERRORS
        catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.BAD_REQUEST, "Probleme de deconnexion");
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthenticationResponse> refresh(HttpServletRequest request,
            HttpServletResponse response) throws IOException {
        // System.out.println("refresh");
        try {
            String refreshToken = null;
            Cookie[] cookies = request.getCookies();
            if (cookies == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        AuthenticationResponse.builder().statusCode(HttpStatus.UNAUTHORIZED.value())
                                .message("Refresh token introuvable").build());
            }
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
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur de rafraichissement du token");
        }
    }

    @PostMapping("/email/send-verification")
    public ResponseEntity<AuthenticationResponse> sendVerificationMail(@RequestParam String email) {
        CompletableFuture<Void> future = emailVerificationService.sendVerificationToken(email);

        // ERROR HANDLING
        try {
            future.get();
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .statusCode(HttpStatus.OK.value())
                            .message("Email de vérification envoyé avec succès")
                            .build());
        } catch (ExecutionException | InterruptedException | ResponseStatusException e) {
            // Here you can handle the exception as needed
            if (e.getCause() instanceof ResponseStatusException) {
                ResponseStatusException exception = (ResponseStatusException) e.getCause();
                // Handle the ResponseStatusException here
                return handleResponseStatusException(exception);
            }
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de l'envoi de l'email");
        } catch (Exception e) {
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de l'envoi de l'email");
        }
    }

    @PostMapping("/email/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody EmailVerificationRequest request) {
        try {
            Utilisateur verifiedUser = emailVerificationService.verifyEmail(request.getEmail(), request.getToken());
            return ResponseEntity.ok(verifiedUser);
        } catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la vérification de l'email");
        }
    }

    // helper

    private ResponseEntity<AuthenticationResponse> handleException(Exception e, HttpStatus status,
            String defaultMessage) {
        return ResponseEntity.status(status).body(
                AuthenticationResponse.builder()
                        .statusCode(status.value())
                        .message(defaultMessage + ": " + e.getMessage())
                        .build());
    }

    private ResponseEntity<AuthenticationResponse> handleResponseStatusException(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(
                AuthenticationResponse.builder()
                        .statusCode(e.getStatusCode().value())
                        .message(e.getReason())
                        .build());
    }
}
