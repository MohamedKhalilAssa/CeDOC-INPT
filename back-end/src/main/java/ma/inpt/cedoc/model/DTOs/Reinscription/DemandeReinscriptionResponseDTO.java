package ma.inpt.cedoc.model.DTOs.Reinscription;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.entities.Reinscription.AvisReinscription;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

@NoArgsConstructor
@Data
@AllArgsConstructor
public class DemandeReinscriptionResponseDTO extends BaseResponseDTO {

    private int annee;

    private String rapportAvancement;

    private String planAction;

    private boolean residance;

    private String attestationHonneur;

    private String CertificatTravail;

    private String demandeDerogation;

    private Long demandeurId;

    private Long sujetId;

    private Long avisReinscriptionId;
}
