package ma.inpt.cedoc.service.auth;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.Configuration.Security.JWT.JwtUtil;
import ma.inpt.cedoc.model.DTOs.auth.AuthenticationResponse;
import ma.inpt.cedoc.model.DTOs.auth.LoginRequest;
import ma.inpt.cedoc.model.DTOs.auth.RegisterRequestDTO;
import ma.inpt.cedoc.model.DTOs.auth.TokenRefreshRequest;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.UtilisateurMapper;
import ma.inpt.cedoc.model.entities.auth.Token;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.model.enums.auth.TokenEnum;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;
import ma.inpt.cedoc.service.Global.EmailService;

@Service
@RequiredArgsConstructor
@Transactional
public class AuthenticationServiceImpl implements AuthenticationService {

        private final UtilisateurRepository utilisateurRepository;
        private final PasswordEncoder passwordEncoder;
        private final EmailVerificationService emailVerificationService;
        private final EmailService emailService;
        private final JwtUtil jwtUtil;
        private final AuthenticationManager authenticationManager;
        private final TokenService tokenService;
        private final UtilisateurMapper utilisateurMapper;

        @Value("${app.front-end-url}")
        private String frontendUrl;
        @Value("${jwt.refreshTokenExpiration}")
        private int refreshTokenExpiration;
        @Value("${app.domain}")
        private String cookieDomain;
        @Value("${email-verification.required}")
        private boolean emailVerificationRequired;

        @Override
        public AuthenticationResponse register(RegisterRequestDTO request, HttpServletResponse response)
                        throws InterruptedException, ExecutionException {

                // create new utilisateur object

                if (utilisateurRepository.existsByEmail(request.getEmail())) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Utilisateur deja inscrit");
                }

                request.setPassword(passwordEncoder.encode(request.getPassword()));
                Utilisateur utilisateur = utilisateurMapper.RegisterRequestDTOToUtilisateur(request);

                // save in db and return
                var savedUtilisateur = utilisateurRepository.saveAndFlush(utilisateur);
                // Send verification mail

                CompletableFuture<Void> future = emailVerificationService
                                .sendVerificationToken(savedUtilisateur);

                // ERROR HANDLINGs
                try {
                        future.get();
                        return AuthenticationResponse.builder()
                                        .status(HttpStatus.OK.value())
                                        .message("Utilisateur inscrit. Merci de verifier votre compte avant de proceder (Voir Mail)")
                                        .build();
                } catch (Exception e) {
                        throw e;
                }
        }

        @Override
        public AuthenticationResponse login(LoginRequest request, HttpServletResponse response) {

                Utilisateur utilisateur = utilisateurRepository.findByEmail((String) request.getEmail())
                                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                "Utilisateur introuvable"));

                System.out.println(emailVerificationRequired);
                if (emailVerificationRequired && !utilisateur.isEmailValider()) {
                        emailVerificationService.sendVerificationToken(
                                        utilisateur.getEmail());
                        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                                        "Veuillez verifier votre compte. Voir Mail.");
                }
                // AUTHENTICATION PROCESS
                Map<String, String> tokens = authenticate(request, utilisateur);

                // SENDING TOKENS BACK
                ResponseCookie cookie = ResponseCookie.from("refresh_token",
                                tokens.get("refresh_token")).httpOnly(true)
                                // .secure(true) // Ensure cookie is only sent over HTTPS
                                .path("/api/")
                                .maxAge(refreshTokenExpiration)
                                .sameSite("Lax")
                                .domain(cookieDomain)
                                .build();
                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
                response.addHeader(HttpHeaders.AUTHORIZATION,
                                JwtUtil.AUTHORIZATION_PREFIX + tokens.get("access_token"));
                return AuthenticationResponse.builder()
                                .status(HttpServletResponse.SC_OK)
                                .message("Utilisateur authentifier avec success")
                                .build();
        }

        @Override
        public Map<String, String> authenticate(LoginRequest request, Utilisateur utilisateur) {
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
                // return tokens
                Map<String, String> tokens = new HashMap<>();
                tokens.put("access_token", accessToken);
                tokens.put("refresh_token", refreshToken);
                return tokens;
        }

        @Override
        public AuthenticationResponse logout(HttpServletResponse response) {

                User user = (User) SecurityContextHolder.getContext().getAuthentication()
                                .getPrincipal();
                // revoking all tokens

                Utilisateur utilisateur = utilisateurRepository.findByEmail(user.getUsername()).orElseThrow();
                revokeAllUserTokens(utilisateur);
                // DELETING TOKEN FROM COOKIes
                ResponseCookie cookie = ResponseCookie.from("refresh_token", "")
                                .httpOnly(true)
                                .path("/api/")
                                .maxAge(0)
                                .sameSite("Lax")
                                .domain(cookieDomain)
                                .build();
                response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

                return AuthenticationResponse.builder()
                                .status(HttpServletResponse.SC_OK)
                                .message("Utilisateur deconnecté avec success")
                                .build();
        }

        @Override
        public AuthenticationResponse refreshToken(TokenRefreshRequest request, HttpServletResponse response)
                        throws IOException {
                final String userEmail;
                final String refreshToken = request.getRefreshToken();
                if (refreshToken == null) {
                        return AuthenticationResponse.builder().status(401).message("Refresh token introuvable")
                                        .build();
                }

                try {
                        userEmail = jwtUtil.extractSubject(refreshToken);
                } catch (JwtException e) {
                        tokenService.findAndRevokeToken(refreshToken);
                        return AuthenticationResponse.builder().status(401).message("Refresh token invalide")
                                        .build();
                }
                if (userEmail != null) {
                        var user = utilisateurRepository.findByEmail(userEmail)
                                        .orElseThrow();
                        if (jwtUtil.isTokenValid(refreshToken, user)) {
                                var accessToken = jwtUtil.generateAccessToken(user);
                                revokeAllUserAccessTokens(user);
                                saveUserToken(user, accessToken, TokenEnum.BEARER);
                                AuthenticationResponse authResponse = AuthenticationResponse.builder()
                                                .accessToken(accessToken)
                                                .status(200)
                                                .message("Utilisateur Authentifier avec success")
                                                .build();
                                return authResponse;
                        }
                }
                return AuthenticationResponse.builder().status(401).message("Refresh token process failed").build();

        }

        @Override
        @Async
        public CompletableFuture<Void> forgotPassword(String email) {

                try {
                        final Utilisateur utilisateur = utilisateurRepository.findByEmail(email.trim())
                                        .filter(u -> u.isEmailValider())
                                        .orElseThrow(
                                                        () -> new ResponseStatusException(
                                                                        org.springframework.http.HttpStatus.GONE,
                                                                        "Utilisateur introuvable ou non verifié"));

                        final String token = jwtUtil.generateAccessTokenWithOnlyEmail(utilisateur);

                        // SAVING TOKEN
                        final var savedToken = tokenService.save(Token.builder().token(token)
                                        .utilisateur(utilisateur).tokenType(TokenEnum.RESET_PASSWORD).build());

                        final var verificationUrl = frontendUrl + "/auth/reset-password?email=" + email
                                        + "&t=" + savedToken.getToken();

                        String content = """
                                           <h2 style="color: #333">Bonjour %s,</h2>
                                           <p style="font-size: 16px; color: #555">
                                             Pour changer votre mot de passe, veuillez cliquer sur le bouton ci-dessous :
                                           </p>

                                           <div style="text-align: center; margin: 30px 0">
                                             <a
                                               href="%s"
                                               style="
                                                 background-color: #007bff;
                                                 color: white;
                                                 padding: 12px 25px;
                                                 border-radius: 5px;
                                                 text-decoration: none;
                                                 font-size: 16px;
                                               "
                                             >Changer mon mot de passe</a>
                                           </div>

                                           <hr style="border: none; border-top: 1px solid #eee" />

                                           <p style="font-size: 13px; color: #999">
                                             Ce lien/code expirera dans 15 minutes.
                                           </p>
                                           <p style="font-size: 13px; color: #999">
                                             Si vous n'avez pas demandé ce changement, ignorez ce message.
                                           </p>
                                        """;

                        content = String.format(content, utilisateur.getEmail(), verificationUrl);
                        return emailService.sendMailToUtilisateur(utilisateur,"Changement de mot de passe" ,"Demande de changement de mot de passe",
                                        content);
                } catch (Exception e) {
                        return CompletableFuture.failedFuture(e);
                }
        }

        @Override
        public AuthenticationResponse resetPassword(String token, String password) {

                Token resetToken = tokenService.findByTokenAndTokenType(token, TokenEnum.RESET_PASSWORD);
                if (resetToken == null) {
                        return AuthenticationResponse.builder().status(401).message("Token introuvable")
                                        .build();
                }
                Utilisateur utilisateur = resetToken.getUtilisateur();
                if(passwordEncoder.matches(password, utilisateur.getPassword())) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Il est impossible de mettre le meme mot de passe que l'ancien");
                }
                tokenService.revokeToken(resetToken);
                utilisateur.setPassword(passwordEncoder.encode(password));
                utilisateurRepository.save(utilisateur);
                revokeAllUserTokens(utilisateur);

                return AuthenticationResponse.builder()
                                .status(200)
                                .message("Mot de passe changé avec success")
                                .build();

        }

        /* HELPERS ----------------------------------------------- */
        private void saveUserToken(Utilisateur utilisateur, String jwtToken, TokenEnum type) {
                Token token = Token.builder()
                                .utilisateur(utilisateur)
                                .token(jwtToken)
                                .tokenType(type)
                                .revoked(false)
                                .expired(false)
                                .build();
                tokenService.save(token);
        }

        private void revokeAllUserTokens(Utilisateur utilisateur) {
                List<Token> validTokens = tokenService
                                .findAllByUtilisateurAndExpiredFalseAndRevokedFalse(utilisateur);
                for (Token token : validTokens) {
                        token.setExpired(true);
                        token.setRevoked(true);
                }
                tokenService.saveAll(validTokens);
        }

        private void revokeAllUserAccessTokens(Utilisateur utilisateur) {
                List<Token> validTokens = tokenService
                                .findAllByUtilisateurAndExpiredFalseAndRevokedFalseAndTokenType(utilisateur,
                                                TokenEnum.BEARER);
                for (Token token : validTokens) {
                        token.setExpired(true);
                        token.setRevoked(true);
                }
                tokenService.saveAll(validTokens);
        }
}
