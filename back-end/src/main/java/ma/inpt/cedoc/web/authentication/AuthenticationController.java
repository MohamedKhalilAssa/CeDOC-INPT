package ma.inpt.cedoc.web.authentication;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.Helpers.UtilFunctions;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.DTOs.auth.*;
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
    public ResponseEntity<AuthenticationResponse> register(@RequestBody @Valid RegisterRequestDTO request,
            HttpServletResponse response) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() &&
                !authentication.getPrincipal().equals("anonymousUser")) {
            return alreadyLoggedIn();
        }

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

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() &&
                !authentication.getPrincipal().equals("anonymousUser")) {
            return alreadyLoggedIn();
        }

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
            Cookie extractedCookie = UtilFunctions.extractCookie(request, "refresh_token");

            if (extractedCookie == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        AuthenticationResponse.builder().status(HttpStatus.UNAUTHORIZED.value())
                                .message("Refresh token introuvable").build());
            }

            refreshToken = extractedCookie.getValue();
            if (refreshToken == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(AuthenticationResponse.builder().status(
                                HttpStatus.UNAUTHORIZED.value())
                                .message("Refresh token introuvable").build());
            }

            TokenRefreshRequest tokenRefreshRequest = TokenRefreshRequest.builder().refreshToken(refreshToken).build();

            return ResponseEntity.ok(authenticationService.refreshToken(tokenRefreshRequest, response));
        } catch (Exception e) {
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur de rafraichissement du token");
        }
    }

    // MAIL VERIFICATION
    @PostMapping("/send-verification")
    public ResponseEntity<AuthenticationResponse> sendVerificationMail(
            @RequestBody @Valid EmailRequest request) {

        CompletableFuture<Void> future = emailVerificationService.sendVerificationToken(request.getEmail());

        // ERROR HANDLING
        try {
            future.get();
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .status(HttpStatus.OK.value())
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

    @PostMapping("/verify-email")
    public ResponseEntity<?> verifyEmail(@RequestBody @Valid EmailVerificationRequest request) {
        try {
            UtilisateurResponseDTO verifiedUser = emailVerificationService.verifyEmail(request.getEmail(),
                    request.getToken());
            return ResponseEntity.ok(verifiedUser);
        } catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.INTERNAL_SERVER_ERROR, "Erreur lors de la vérification de l'email");
        }
    }

    // PASSWORD RESET HANDLING

    @PostMapping("/forgot-password")
    public ResponseEntity<AuthenticationResponse> forgotPassword(@RequestBody @Valid EmailRequest request) {
        CompletableFuture<Void> future = authenticationService.forgotPassword(request.getEmail());
        // ERROR HANDLING
        try {
            future.get();
            return ResponseEntity.ok(
                    AuthenticationResponse.builder()
                            .status(HttpStatus.OK.value())
                            .message("Email de reinstialisation de mot de passe envoyé avec succès")
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

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody @Valid ResetPasswordRequest request) {
        try {
            AuthenticationResponse authResponse = authenticationService.resetPassword(request.getToken(),
                    request.getNewPassword());
            return ResponseEntity.ok(authResponse);
        }
        // CATCHING ERRORS
        catch (ResponseStatusException e) {
            return handleResponseStatusException(e);
        } catch (Exception e) {
            return handleException(e, HttpStatus.BAD_REQUEST, "Erreur lors de changement de mot de passe");
        }

    }

    @GetMapping("/check")
    public ResponseEntity<Object> checkAuth() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication != null && authentication.isAuthenticated() &&
                !authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.ok().body(Map.of(
                    "authenticated", true,
                    "message", "User is authenticated"));
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "authenticated", false,
                "error", "unauthenticated",
                "message", "User is not authenticated",
                "requiresLogin", true));
    }

    // helper
    private ResponseEntity<AuthenticationResponse> handleException(Exception e, HttpStatus status,
            String defaultMessage) {
        return ResponseEntity.status(status).body(
                AuthenticationResponse.builder()
                        .status(status.value())
                        .message(defaultMessage + ": " + e.getMessage())
                        .build());
    }

    private ResponseEntity<AuthenticationResponse> handleResponseStatusException(ResponseStatusException e) {
        return ResponseEntity.status(e.getStatusCode()).body(
                AuthenticationResponse.builder()
                        .status(e.getStatusCode().value())
                        .message(e.getReason())
                        .build());
    }

    private ResponseEntity<AuthenticationResponse> alreadyLoggedIn() {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST.value())
                .body(AuthenticationResponse.builder().status(HttpStatus.BAD_REQUEST.value())
                        .message("You are already logged in").build());
    }

}
