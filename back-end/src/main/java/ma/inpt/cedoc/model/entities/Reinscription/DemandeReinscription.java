package ma.inpt.cedoc.model.entities.Reinscription;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DemandeReinscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int année;

    @NotBlank(message = "Le rapport d'avancement est obligatoire")
    private String rapportAvancement;

    @NotBlank(message = "Le plan d'action est obligatoire")
    private String planAction;

    @NotBlank(message = "La résidance est obligatoire")
    private boolean residance;

    @NotBlank(message = "L'attestation d'honneur est obligatoire")
    private String attestationHonneur;

    @NotBlank(message = "La certificat de travail est obligatoire")
    private String CertificatTravail;

    @NotBlank(message = "Demande de derogation est obligatoire")
    private String demandeDerogation;

    //----------- Relation ----------------

    @ManyToOne
    @JoinColumn(name = "doctorant_id")
    private Doctorant demandeur;

    @ManyToOne
    @JoinColumn(name = "sujet_id")
    private Sujet sujet;

    @OneToOne
    @JoinColumn(name = "avis_reinscription_id")
    private AvisReinscription avisReinscription;


}
