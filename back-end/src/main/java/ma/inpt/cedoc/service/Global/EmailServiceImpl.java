package ma.inpt.cedoc.service.Global;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender mailSender;


    @Value("${app.base-url}")
    private String baseUrl;

    @Value("${app.email}")

    private String appEmail;

    public CompletableFuture<Void> sendMailToUtilisateur(Utilisateur utilisateur, String title, String content) {

        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(utilisateur.getEmail());
            helper.setSubject("Vérification de votre adresse email");
            helper.setFrom(appEmail);
            String logoUrl = baseUrl + "/images/Logo_inpt.png";
            String template = """
                    <html>
                       <body
                         style="
                           margin: 0;
                           padding: 0;
                           font-family: Arial, sans-serif;
                           background-color: #f4f4f4;
                         "
                       >
                         <div
                           style="
                             max-width: 700px;
                             margin: 20px auto;
                             background-color: #ffffff;
                             border-radius: 8px;
                             overflow: hidden;
                             box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                           "
                         >
                           <div
                             style="
                               background-color: #fff;
                               border-bottom: 1px solid #333;
                               padding: 20px;
                               text-align: center;
                             "
                           >
                             <img
                               src="%s"
                               alt="CEDOC Logo"
                               style="width: 120px; margin-bottom: 10px"
                             />
                             <h1 style="color: black; font-size: 22px">
                               %s
                             </h1>
                           </div>

                           <div style="padding: 30px">
                            %s
                           </div>

                           <div
                             style="
                               background-color: #f0f0f0;
                               text-align: center;
                               padding: 15px;
                               font-size: 12px;
                               color: #888;
                             "
                           >
                             © 2025 CEDOC INPT. Tous droits réservés.
                           </div>
                         </div>
                       </body>
                     </html>
                     """;

            String htmlTemp = String.format(template, logoUrl, title, content);

            helper.setText(htmlTemp, true);

            mailSender.send(mimeMessage);

            return CompletableFuture.completedFuture(null);
        }

        catch (Exception e) {
            return CompletableFuture.failedFuture(e);

        }
    }
}
