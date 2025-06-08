package ma.inpt.cedoc.service.auth;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import jakarta.servlet.http.HttpServletResponse;
import ma.inpt.cedoc.model.DTOs.auth.*;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

public interface AuthenticationService {

        AuthenticationResponse register(RegisterRequestDTO request, HttpServletResponse response)
                        throws InterruptedException, ExecutionException;

        AuthenticationResponse login(LoginRequest request, HttpServletResponse response);

        Map<String, String> authenticate(LoginRequest request, Utilisateur utilisateur);

        AuthenticationResponse logout(HttpServletResponse response);

        CompletableFuture<Void> forgotPassword(String email);

        AuthenticationResponse resetPassword(String token, String password);

        AuthenticationResponse refreshToken(TokenRefreshRequest request, HttpServletResponse response)
                        throws IOException;

}