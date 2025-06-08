package ma.inpt.cedoc.repositories.model.DTOs.Reinscription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.DTOs.Generic.BaseResponseDTO;

@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper = true)
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
