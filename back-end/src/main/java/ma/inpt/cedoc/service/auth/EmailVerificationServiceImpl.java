package ma.inpt.cedoc.service.auth;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.UtilisateurMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;
import ma.inpt.cedoc.service.Global.EmailService;

@Service
@RequiredArgsConstructor
public class EmailVerificationServiceImpl implements EmailVerificationService {

  private final OtpService otpService;

  private final UtilisateurRepository utilisateurRepository;

  private final UtilisateurMapper utilisateurMapper;

  private final EmailService emailService;
  @Value("${app.front-end-url}")
  private String frontendUrl;

  @Override
  @Async
  public CompletableFuture<Void> sendVerificationToken(String email) {
    try {
      final Utilisateur user = utilisateurRepository.findByEmail(email.trim()).filter(u -> !u.isEmailValider())
          .orElseThrow(
              () -> new ResponseStatusException(
                  org.springframework.http.HttpStatus.GONE,
                  "Utilisateur introuvable ou deja verifié"));
      return sendVerificationToken(user);
    } catch (Exception e) {
      return CompletableFuture.failedFuture(e);
    }
  }

  @Override
  @Async
  public CompletableFuture<Void> sendVerificationToken(Utilisateur user) {
    try {

      final long userId = user.getId();
      final String email = user.getEmail();
      final boolean canResend = otpService.canResendOtp(userId);
      if (!canResend) {
        System.out.println("Attente de 1 minute avant la prochaine tentative");
        return CompletableFuture.failedFuture(
            new ResponseStatusException(HttpStatus.BAD_REQUEST, "Attente de 1 minute avant la prochaine tentative"));
      }

      final var token = otpService.generateAndStoreOtp(userId);
      final var verificationUrl = frontendUrl + "/auth/verify-email?email=" + email
          + "&t=" + token + "&auto=1";

      String content = """
             <h2 style="color: #333">Bonjour %s,</h2>
                <p style="font-size: 16px; color: #555">
                  Merci de vous être inscrit. Pour activer votre compte, veuillez
                  confirmer votre adresse email en cliquant sur le bouton ci-dessous :
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
                    >Vérifier mon email</a
                  >
                </div>

                <hr style="border: none; border-top: 1px solid #eee" />

                <p style="font-size: 14px; color: #666">
                  Si le bouton ne fonctionne pas, vous pouvez utiliser ce code :
                </p>
                <div style="text-align: center; margin: 20px 0">
                  <code style="font-size: 20px; font-weight: bold; color: #222"
                    >%s</code
                  >
                </div>

                <p style="font-size: 13px; color: #999">
                  Ce lien/code expirera dans 15 minutes.
                </p>
                <p style="font-size: 13px; color: #999">
                  Si vous n'avez pas demandé cette vérification, ignorez ce message.
                </p>
          """;
      content = String.format(content, user.getEmail(), verificationUrl, token);
      return emailService.sendMailToUtilisateur(user,"Vérification de votre adresse email" ,"Demande de Vérification de votre adresse email", content);
    } catch (Exception e) {
      return CompletableFuture.failedFuture(e);
    }
  }

  @Override
  @Transactional
  public UtilisateurResponseDTO verifyEmail(String email, String token) {
    final var utilisateur = utilisateurRepository.findByEmail(
        email)
        .orElseThrow(() -> new ResponseStatusException(
            org.springframework.http.HttpStatus.GONE,
            "Utilisateur supprimé ou desactivé"));

    final long userId = utilisateur.getId();
    if (!otpService.isOtpValid(userId, token)) {
      throw new ResponseStatusException(
          org.springframework.http.HttpStatus.BAD_REQUEST,
          "Token invalide ou expiré");
    }
    otpService.deleteOtp(userId);

    if (utilisateur.isEmailValider()) {
      throw new ResponseStatusException(
          org.springframework.http.HttpStatus.BAD_REQUEST,
          "Email deja verifié");
    }

    utilisateur.setEmailValider(true);

    utilisateurRepository.save(utilisateur);

    UtilisateurResponseDTO utilisateurResponseDTO = utilisateurMapper
        .utilisateurToUtilisateurResponseDTO(utilisateur);

    return utilisateurResponseDTO;
  }
}