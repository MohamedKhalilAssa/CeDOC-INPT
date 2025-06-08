package ma.inpt.cedoc.repositories.model.DTOs.Reinscription;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DemandeReinscriptionRequestDTO {

    private int annee;

    private String rapportAvancement;

    private String planAction;

    private boolean residance;

    private String attestationHonneur;

    private String CertificatTravail;

    private String demandeDerogation;

    private Long sujetId;

}
