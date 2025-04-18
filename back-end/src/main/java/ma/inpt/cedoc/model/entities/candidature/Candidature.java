package ma.inpt.cedoc.model.entities.candidature;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.enums.candidature_enums.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "Candidature")
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
    private String dossierCandidature; // Peut contenir un lien ou chemin vers un fichier ZIP

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le type d'établissement est obligatoire")
    @Column(name = "type_etablissement")
    private EtablissementEnum typeEtablissement;

    @NotBlank(message = "La spécialité est obligatoire")
    @Column(name = "specialite")
    private String specialite;

    @NotBlank(message = "L'intitulé du PFE est obligatoire")
    @Column(name = "intitule_pfe")
    private String intitulePFE;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Le statut professionnel est obligatoire")
    @Column(name = "statut_professionnel")
    private StatutProfessionnelEnum statutProfessionnel;

    // ----------------- Relations à activer et modifier plus tard ---------------------------------------

    
    // private Sujet sujet;

    
    // private Candidat candidat;
}
