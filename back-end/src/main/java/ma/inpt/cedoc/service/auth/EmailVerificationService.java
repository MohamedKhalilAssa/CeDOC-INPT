package ma.inpt.cedoc.service.auth;

import java.util.concurrent.CompletableFuture;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;

public interface EmailVerificationService {

    CompletableFuture<Void> sendVerificationToken(String email);

    UtilisateurResponseDTO verifyEmail(String email, String token);

}