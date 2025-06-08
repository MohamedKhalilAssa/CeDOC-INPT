package ma.inpt.cedoc.service.auth;

import java.util.List;

import ma.inpt.cedoc.repositories.model.entities.auth.Token;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.model.enums.auth.TokenEnum;

public interface TokenService {

    Token findByToken(String token);

    Token findByTokenAndNonExpiredOrRevoked(String token);

    Token findByTokenAndTokenType(String token, TokenEnum type);

    List<Token> findAllByUtilisateurAndExpiredFalseAndRevokedFalse(Utilisateur utilisateur);

    List<Token> findAllByUtilisateurAndExpiredFalseAndRevokedFalseAndTokenType(Utilisateur utilisateur, TokenEnum type);

    boolean findAndRevokeToken(String token);

    boolean revokeToken(Token token);
    // SAVING

    List<Token> saveAll(List<Token> tokens);

    Token save(Token token);
}