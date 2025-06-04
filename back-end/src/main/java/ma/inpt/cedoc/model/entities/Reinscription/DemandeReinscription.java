package ma.inpt.cedoc.model.entities.Reinscription;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotNull;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;
import ma.inpt.cedoc.model.enums.reinscription_enums.DemandeReinscriptionEnum;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

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
@Table(name = "demandes_reinscriptions")
@EntityListeners(AuditingEntityListener.class)
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

    // la demande d'inscription doit etre approuvé par le chef d'équipe et la direction du cedoc

    @NotNull(message = "Etat de demande de réinscription est obligatoire")
    private DemandeReinscriptionEnum status = DemandeReinscriptionEnum.DECLAREE;

    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;


    // ----------- Relation ----------------

    @ManyToOne
    @JoinColumn(name = "doctorant_id")
    private Doctorant demandeur;

    @ManyToOne
    @JoinColumn(name = "sujet_id")
    private Sujet sujet;

    @OneToOne(mappedBy = "demandeReinscription", cascade = CascadeType.ALL, orphanRemoval = true)
    private AvisReinscription avisReinscription;

}
