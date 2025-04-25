package ma.inpt.cedoc.repositories.authRepositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.auth.Token;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.model.enums.auth.TokenEnum;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findAllByUtilisateurAndExpiredFalseAndRevokedFalse(Utilisateur utilisateur);

    List<Token> findAllByUtilisateurAndExpiredFalseAndRevokedFalseAndTokenType(Utilisateur utilisateur, TokenEnum type);

    Optional<Token> findByToken(String token);
}