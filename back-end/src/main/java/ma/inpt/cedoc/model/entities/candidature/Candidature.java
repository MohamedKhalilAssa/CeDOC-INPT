package ma.inpt.cedoc.model.entities.candidature;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.candidature_enums.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.ZonedDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "candidatures")
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le statut de la candidature est obligatoire")
    @Column(name = "statut_candidature")
    private CandidatureEnum statutCandidature;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La mention du Bac est obligatoire")
    @Column(name = "mention_bac")
    private MentionEnum mentionBac;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "La mention du diplôme est obligatoire")
    @Column(name = "mention_diplome")
    private MentionEnum mentionDiplome;

    @NotBlank(message = "Le dossier de candidature est obligatoire")
    @Column(name = "dossier_candidature")
    @Pattern(regexp = "^.+\\.zip$", message = "Le dossier doit être un fichier .zip")
    private String dossierCandidature; // Peut contenir un lien ou chemin vers un fichier ZIP

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le type d'établissement est obligatoire")
    @Column(name = "type_etablissement")
    private EtablissementEnum typeEtablissement;

    @NotBlank(message = "La spécialité est obligatoire.")
    @Column(name = "specialite")
    @Pattern(regexp = "^[\\p{L}0-9,.'\"()&-]+(?:\\s[\\p{L}0-9,.'\"()&-]+)*$", message = "La specialité contient des caracteres invalides.")
    private String specialite;

    @NotBlank(message = "L'intitulé du PFE est obligatoire.")
    @Column(name = "intitule_pfe")
    @Pattern(regexp = "^[\\p{L}0-9,.'\"()&-]+(?:\\s[\\p{L}0-9,.'\"()&-]+)*$", message = "L'intitulé PFE contient des caracteres invalides.")
    private String intitulePFE;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le statut professionnel est obligatoire")
    @Column(name = "statut_professionnel")
    private StatutProfessionnelEnum statutProfessionnel;

    //    for logging and administration purposes it will be filled by the system
    @Column(name="created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name="updated_at")
    @LastModifiedDate
    private ZonedDateTime updatedAt;






    // ----------------- Relations à activer et modifier plus tard ---------------------------------------

    
    // private Sujet sujet;

    
    // private Candidat candidat;
}
