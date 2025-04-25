package ma.inpt.cedoc.service.auth;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.Configuration.Security.JWT.JwtUtil;
import ma.inpt.cedoc.model.DTOs.auth.AuthenticationResponse;
import ma.inpt.cedoc.model.DTOs.auth.LoginRequest;
import ma.inpt.cedoc.model.DTOs.auth.RegisterRequest;
import ma.inpt.cedoc.model.DTOs.auth.TokenRefreshRequest;
import ma.inpt.cedoc.model.entities.auth.Token;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.model.enums.auth.TokenEnum;
import ma.inpt.cedoc.repositories.authRepositories.TokenRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UtilisateurRepository utilisateurRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final TokenRepository tokenRepository;
    @Value("domain")
    private String cookieDomain;

    @Value("${jwt.refreshTokenExpiration}")
    private int refreshTokenExpiration;

    public AuthenticationResponse register(RegisterRequest request, HttpServletResponse response)
            throws IllegalStateException {

        // create new utilisateur object

        if (utilisateurRepository.existsByEmail(request.getEmail())) {
            throw new IllegalStateException("Utilisateur est déja inscrit");
        }

        var utilisateur = Utilisateur.builder()
                .prenom(request.getPrenom())
                .nom(request.getNom())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .telephone(request.getTelephone())
                .dateNaissance(request.getDateNaissance())
                .etatCivilEnum(request.getEtatCivilEnum())
                .genre(request.getGenre())
                .build();
        // save in db and return
        var savedUtilisateur = utilisateurRepository.save(utilisateur);
        // generate tokens
        String accessToken = jwtUtil.generateAccessToken(utilisateur);
        String refreshToken = jwtUtil.generateRefreshToken(utilisateur);
        // save tokens in db
        saveUserToken(savedUtilisateur, accessToken, TokenEnum.BEARER);
        saveUserToken(savedUtilisateur, refreshToken, TokenEnum.REFRESH);
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        // ADD REFRESH TOKEN AS HTTP ONLY COOKIE
        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken).httpOnly(true)
                // .secure(true) // Ensure cookie is only sent over HTTPS
                .path("/api/auth/refresh-token") // Set the path for the cookie (adjust to your needs)
                .maxAge(refreshTokenExpiration) // Set expiration (1 week in this example)
                .sameSite("Lax")
                .domain(cookieDomain)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .statusCode(200)
                .message("Utilisateur inscrit et authentifier avec success")
                .build();
    }

    public AuthenticationResponse login(LoginRequest request, HttpServletResponse response) {

        Utilisateur utilisateur = utilisateurRepository.findByEmail(request.getEmail()).orElseThrow();

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));

        // generate tokens
        String accessToken = jwtUtil.generateAccessToken(utilisateur);
        String refreshToken = jwtUtil.generateRefreshToken(utilisateur);
        // save tokens in db and revoke previous ones
        revokeAllUserTokens(utilisateur);
        saveUserToken(utilisateur, accessToken, TokenEnum.BEARER);
        saveUserToken(utilisateur, refreshToken, TokenEnum.REFRESH);
        // ADD REFRESH TOKEN AS HTTP ONLY COOKIE
        ResponseCookie cookie = ResponseCookie.from("refresh_token", refreshToken).httpOnly(true)
                // .secure(true) // Ensure cookie is only sent over HTTPS
                .path("/api/auth/refresh-token") // Set the path for the cookie (adjust to your needs)
                .maxAge(refreshTokenExpiration) // Set expiration (1 week in this example)
                .sameSite("Lax")
                .domain(cookieDomain)
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return AuthenticationResponse.builder()
                .accessToken(accessToken)
                .statusCode(200)
                .message("Utilisateur inscrit et authentifier avec success")
                .build();
    }

    public AuthenticationResponse refreshToken(TokenRefreshRequest request, HttpServletResponse response)
            throws IOException {
        final String userEmail;
        final String refreshToken = request.getRefreshToken();
        if (refreshToken == null) {
            return AuthenticationResponse.builder().statusCode(401).message("Refresh token introuvable").build();
        }

        userEmail = jwtUtil.extractSubject(refreshToken);
        if (userEmail != null) {
            var user = utilisateurRepository.findByEmail(userEmail)
                    .orElseThrow();
            if (jwtUtil.isTokenValid(refreshToken, user)) {
                var accessToken = jwtUtil.generateAccessToken(user);
                revokeAllUserAccessTokens(user);
                saveUserToken(user, accessToken, TokenEnum.BEARER);
                AuthenticationResponse authResponse = AuthenticationResponse.builder()
                        .accessToken(accessToken)
                        .statusCode(200)
                        .message("Utilisateur Authentifier avec success")
                        .build();
                return authResponse;
            }
        }
        return AuthenticationResponse.builder().statusCode(401).message("Refresh token process failed").build();

    }

    private void saveUserToken(Utilisateur utilisateur, String jwtToken, TokenEnum type) {
        Token token = Token.builder()
                .utilisateur(utilisateur)
                .token(jwtToken)
                .tokenType(type)
                .revoked(false)
                .expired(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(Utilisateur utilisateur) {
        List<Token> validTokens = tokenRepository.findAllByUtilisateurAndExpiredFalseAndRevokedFalse(utilisateur);
        for (Token token : validTokens) {
            token.setExpired(true);
            token.setRevoked(true);
        }
        tokenRepository.saveAll(validTokens);
    }

    private void revokeAllUserAccessTokens(Utilisateur utilisateur) {
        List<Token> validTokens = tokenRepository
                .findAllByUtilisateurAndExpiredFalseAndRevokedFalseAndTokenType(utilisateur, TokenEnum.BEARER);
        for (Token token : validTokens) {
            token.setExpired(true);
            token.setRevoked(true);
        }
        tokenRepository.saveAll(validTokens);
    }
}
