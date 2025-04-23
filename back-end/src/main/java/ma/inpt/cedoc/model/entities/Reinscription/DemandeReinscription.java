package ma.inpt.cedoc.model.entities.Reinscription;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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




}
