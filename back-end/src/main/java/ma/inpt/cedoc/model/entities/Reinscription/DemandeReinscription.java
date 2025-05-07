package ma.inpt.cedoc.model.entities.Reinscription;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "demandes_reinscriptions")
public class DemandeReinscription {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int annee;

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

    @OneToOne(mappedBy = "demandeReinscription", cascade = CascadeType.ALL, orphanRemoval = true)
    private AvisReinscription avisReinscription;

}
