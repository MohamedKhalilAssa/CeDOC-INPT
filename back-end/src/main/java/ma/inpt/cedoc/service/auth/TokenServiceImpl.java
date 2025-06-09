package ma.inpt.cedoc.service.auth;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.auth.Token;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.model.enums.auth.TokenEnum;
import ma.inpt.cedoc.repositories.authRepositories.TokenRepository;

@RequiredArgsConstructor
@Transactional
@Service
public class TokenServiceImpl implements TokenService {

    private final TokenRepository tokenRepository;

    @Override
    public boolean findAndRevokeToken(String token) {
        try {
            Token token1 = tokenRepository.findByToken(token).orElseThrow(
                    () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                            "Token non valide, Veuillez refaire l'operation"));
            token1.setRevoked(true);
            token1.setExpired(true);
            tokenRepository.save(token1);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public boolean revokeToken(Token token) {
        try {
            token.setRevoked(true);
            token.setExpired(true);
            tokenRepository.save(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public Token findByToken(String token) {
        return tokenRepository.findByToken(token).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Token non valide ou introuvable."));
    }

    @Override
    public Token findByTokenAndNonExpiredOrRevoked(String token) {
        return tokenRepository.findByTokenAndExpiredFalseAndRevokedFalse(token).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Token non valide ou introuvable."));
    }

    @Override
    public Token findByTokenAndTokenType(String token, TokenEnum type) {
        return tokenRepository.findByTokenAndTokenType(token, type).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Token non valide ou introuvable."));
    }

    @Override
    public List<Token> findAllByUtilisateurAndExpiredFalseAndRevokedFalse(Utilisateur utilisateur) {
        return tokenRepository.findAllByUtilisateurAndExpiredFalseAndRevokedFalse(utilisateur);
    }

    @Override
    public List<Token> saveAll(List<Token> tokens) {
        return tokenRepository.saveAll(tokens);
    }

    @Override
    public List<Token> findAllByUtilisateurAndExpiredFalseAndRevokedFalseAndTokenType(Utilisateur utilisateur,
            TokenEnum type) {
        return tokenRepository.findAllByUtilisateurAndExpiredFalseAndRevokedFalseAndTokenType(utilisateur, type);
    }

    @Override
    public Token save(Token token) {
        return tokenRepository.save(token);
    }
}
