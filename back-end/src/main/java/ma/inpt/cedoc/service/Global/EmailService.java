package ma.inpt.cedoc.service.Global;

import java.util.concurrent.CompletableFuture;

import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Utilisateur;

public interface EmailService {
    CompletableFuture<Void> sendMailToUtilisateur(Utilisateur utilisateur, String subject, String title, String content);

}
