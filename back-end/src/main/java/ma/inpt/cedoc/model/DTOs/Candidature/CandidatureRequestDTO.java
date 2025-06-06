package ma.inpt.cedoc.model.DTOs.Candidature;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurRequestDTO;
import ma.inpt.cedoc.model.enums.candidature_enums.*;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class CandidatureRequestDTO extends UtilisateurRequestDTO{

    // On conserve le champ statutCandidature (même si on forcera en SOUMISE)
    private CandidatureEnum statutCandidature;

    @NotNull(message = "La mention du Bac est obligatoire")
    private MentionEnum mentionBac;

    @NotNull(message = "Le type de diplôme est obligatoire")
    private DiplomeEnum diplome;

    @NotNull(message = "La mention du diplôme est obligatoire")
    private MentionEnum mentionDiplome;

    @NotNull(message = "Le fichier de candidature est obligatoire")
    private MultipartFile dossierCandidature;

    @NotNull(message = "Le type d'établissement est obligatoire")
    private EtablissementEnum typeEtablissement;

    @NotBlank(message = "La spécialité est obligatoire.")
    private String specialite;

    @NotBlank(message = "L'intitulé du PFE est obligatoire.")
    private String intitulePFE;


    /**
     * Liste des IDs des sujets choisis (1 à 3 éléments).
     */
    @NotNull(message = "Vous devez choisir au moins un sujet")
    @Size(max = 3, message = "Vous ne pouvez sélectionner que 3 sujets au maximum")
    private List<Long> sujetsIds;
}
