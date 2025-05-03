package ma.inpt.cedoc.service.auth;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.UtilisateurMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

  private final OtpService otpService;

  private final UtilisateurRepository utilisateurRepository;

  private final JavaMailSender mailSender;
  private final UtilisateurMapper utilisateurMapper;

  @Value("${app.front-end-url}")
  private String frontendUrl;

  @Value("${app.base-url}")
  private String baseUrl;

  @Value("${app.email}")

  private String appEmail;

  @Async
  public CompletableFuture<Void> sendVerificationToken(String email) {
    try {
      final Utilisateur user = utilisateurRepository.findByEmail(email.trim()).filter(u -> !u.isEmailValider())
          .orElseThrow(
              () -> new ResponseStatusException(
                  org.springframework.http.HttpStatus.GONE,
                  "Utilisateur introuvable ou deja verifié"));

      return sendMailToUtilisateur(user);
    } catch (Exception e) {
      e.printStackTrace();
      return CompletableFuture.failedFuture(e);
    }
  }

  public CompletableFuture<Void> sendMailToUtilisateur(Utilisateur utilisateur) {
    final var userId = utilisateur.getId();
    final String email = utilisateur.getEmail();
    final var token = otpService.generateAndStoreOtp(userId);
    final var verificationUrl = frontendUrl + "/auth/verify-email?email=" + email
        + "&t=" + token + "&auto=1";

    try {
      MimeMessage mimeMessage = mailSender.createMimeMessage();
      MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

      helper.setTo(email);
      helper.setSubject("Vérification de votre adresse email");
      helper.setFrom(appEmail);
      String logoUrl = baseUrl + "/images/Logo_inpt.png";
      String template = """
          <html>
          <body style='margin: 0; padding: 0; font-family: Arial, sans-serif;
          background-color: #f4f4f4;'>
          <div style='max-width: 700px; margin: 20px auto; background-color: #ffffff;
          border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px
          rgba(0,0,0,0.1);'>

          <div style='background-color: #fff;border-bottom: 1px solid #333; padding:
          20px; text-align: center;'>
          <img src='%s' alt='CEDOC Logo' style='width: 120px; margin-bottom: 10px;' />
          <h1 style='color: black; font-size: 22px;'>Vérification de votre email</h1>
          </div>

          <div style='padding: 30px;'>
          <h2 style='color: #333;'>Bonjour %s,</h2>
          <p style='font-size: 16px; color: #555;'>Merci de vous être inscrit. Pour
          activer votre compte, veuillez confirmer votre adresse email en cliquant sur
          le bouton ci-dessous :</p>

          <div style='text-align: center; margin: 30px 0;'>
          <a href='%s' style='background-color: #007BFF; color: white; padding: 12px
          25px; border-radius: 5px; text-decoration: none; font-size: 16px;'>Vérifier
          mon email</a>
          </div>

          <hr style='border: none; border-top: 1px solid #eee;' />

          <p style='font-size: 14px; color: #666;'>Si le bouton ne fonctionne pas, vous
          pouvez utiliser ce code :</p>
          <div style='text-align: center; margin: 20px 0;'>
          <code style='font-size: 20px; font-weight: bold; color: #222;'>%s</code>
          </div>

          <p style='font-size: 13px; color: #999;'>Ce lien/code expirera dans 15
          minutes.</p>
          <p style='font-size: 13px; color: #999;'>Si vous n'avez pas demandé cette
          vérification, ignorez ce message.</p>
          </div>

          <div style='background-color: #f0f0f0; text-align: center; padding: 15px;
          font-size: 12px; color: #888;'>
          © 2025 CEDOC INPT. Tous droits réservés.
          </div>

          </div>
          </body>
          </html>
          """;

      String fullName = utilisateur.getNom() + " " + utilisateur.getPrenom();
      String content = String.format(template, logoUrl, fullName, verificationUrl,
          token);

      helper.setText(content, true);

      mailSender.send(mimeMessage);

      return CompletableFuture.completedFuture(null);
    } catch (Exception e) {
      return CompletableFuture.failedFuture(e);

    }
  }

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