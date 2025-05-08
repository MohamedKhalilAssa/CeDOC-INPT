package ma.inpt.cedoc.service.Global;

import java.util.concurrent.CompletableFuture;

import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

public interface EmailService {
    CompletableFuture<Void> sendMailToUtilisateur(Utilisateur utilisateur, String title, String content);

}
