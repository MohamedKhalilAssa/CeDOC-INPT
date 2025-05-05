package ma.inpt.cedoc.model.DTOs.Utilisateurs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;

@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
public class CandidatRegistrationRequestDTO extends UtilisateurRequestDTO {

    private CandidatureRequestDTO candidature;
}
