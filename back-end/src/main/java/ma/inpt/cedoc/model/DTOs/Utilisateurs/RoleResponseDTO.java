package ma.inpt.cedoc.model.DTOs.Utilisateurs;

import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
public class RoleResponseDTO extends BaseResponseDTO {

    private String intitule;

}
