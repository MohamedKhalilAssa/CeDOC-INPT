package ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs;

import java.time.LocalDate;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.enums.utilisateur_enums.DoctorantEnum;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorantResponseDTO extends UtilisateurResponseDTO {
    private LocalDate dateInscription;
    private DoctorantEnum statutDoctorant;
    private Integer nombreHeuresLabo;
    private String draftDiplomeUrl;
    private Boolean archiver;
}
