package ma.inpt.cedoc.model.DTOs.Candidature;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import ma.inpt.cedoc.model.enums.candidature_enums.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CandidatureRequestDTO {

    @NotNull(message = "Le statut de la candidature est obligatoire")
    @Column(name = "statut_candidature")
    private CandidatureEnum statutCandidature;

    @NotNull(message = "La mention du Bac est obligatoire")
    private MentionEnum mentionBac;

    @NotNull(message = "La mention du diplôme est obligatoire")
    private MentionEnum mentionDiplome;

    @NotBlank(message = "Le dossier de candidature est obligatoire")
    @Pattern(regexp = "^.+\\.zip$", message = "Le dossier doit être un fichier .zip")
    private String dossierCandidature; // Peut contenir un lien ou chemin vers un fichier ZIP

    @NotNull(message = "Le type d'établissement est obligatoire")
    private EtablissementEnum typeEtablissement;

    @NotBlank(message = "La spécialité est obligatoire.")
    @Pattern(regexp = "^[\\p{L}0-9,.'\"()&-]+(?:\\s[\\p{L}0-9,.'\"()&-]+)*$", message = "La specialité contient des caracteres invalides.")
    private String specialite;

    @NotBlank(message = "L'intitulé du PFE est obligatoire.")
    @Pattern(regexp = "^[\\p{L}0-9,.'\"()&-]+(?:\\s[\\p{L}0-9,.'\"()&-]+)*$", message = "L'intitulé PFE contient des caracteres invalides.")
    private String intitulePFE;

    @NotNull(message = "Le statut professionnel est obligatoire")
    private StatutProfessionnelEnum statutProfessionnel;

    @NotNull(message = "Le candidat est obligatoire")
    private Long candidatId;

}