package ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.DTOs.Candidature.CandidatureRequestDTO;

@SuperBuilder
@Data
@EqualsAndHashCode(callSuper = true)
public class CandidatRequestDTO extends UtilisateurRequestDTO {

    private CandidatureRequestDTO candidature;
}
