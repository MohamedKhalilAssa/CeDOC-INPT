package ma.inpt.cedoc.service.auth;

import java.util.concurrent.CompletableFuture;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

public interface EmailVerificationService {

    CompletableFuture<Void> sendVerificationToken(String email);

    CompletableFuture<Void> sendMailToUtilisateur(Utilisateur utilisateur);

    UtilisateurResponseDTO verifyEmail(String email, String token);

}