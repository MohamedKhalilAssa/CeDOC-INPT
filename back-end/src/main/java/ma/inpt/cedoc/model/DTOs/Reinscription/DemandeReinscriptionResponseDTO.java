package ma.inpt.cedoc.model.DTOs.Reinscription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

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

    private Boolean avisChef;

    private Boolean avisDirection;

    private EtatEnum status;

    private Long avisReinscriptionId;
}
