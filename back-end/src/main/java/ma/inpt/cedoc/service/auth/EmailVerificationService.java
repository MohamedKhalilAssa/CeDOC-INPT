package ma.inpt.cedoc.service.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;

@Service
@RequiredArgsConstructor
public class EmailVerificationService {

    private final OtpService otpService;

    private final UtilisateurRepository utilisateurRepository;

    private final JavaMailSender mailSender;

    @Value("${app.base-url}")
    private String appBaseUrl;

    @Async
    public void sendVerificationToken(long userId, String email) {
        final var token = otpService.generateAndStoreOtp(userId);

        // Localhost URL with userId and OTP token
        final var emailVerificationUrl = appBaseUrl + "/api/auth/email/verify?id=%s&t=%s"
                .formatted(userId, token);
        final var emailText = "Click the link to verify your email: " + emailVerificationUrl;

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Email Verification");
        message.setFrom("System");
        message.setText(emailText);

        mailSender.send(message);
    }

    public void resendVerificationToken(String email) {
        Utilisateur user = utilisateurRepository.findByEmail(email)
                .filter(u -> !u.isEmailValider())
                .orElseThrow(() -> new ResponseStatusException(
                        org.springframework.http.HttpStatus.NOT_FOUND, "Email introuvable ou déjà vérifié"));

        sendVerificationToken(user.getId(), user.getEmail());
    }

    @Transactional
    public Utilisateur verifyEmail(long userId, String token) {
        if (!otpService.isOtpValid(userId, token)) {
            throw new ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST,
                    "Token invalide ou expiré");
        }
        otpService.deleteOtp(userId);

        final var utilisateur = utilisateurRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        org.springframework.http.HttpStatus.GONE,
                        "Utilisateur supprimé ou desactivé"));

        if (utilisateur.isEmailValider()) {
            throw new ResponseStatusException(
                    org.springframework.http.HttpStatus.BAD_REQUEST,
                    "Email deja verifié");
        }

        utilisateur.setEmailValider(true);

        return utilisateur;
    }
}