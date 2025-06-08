package ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs;

import java.time.LocalDate;
import java.util.List;

import lombok.*;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.repositories.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.repositories.model.enums.utilisateur_enums.EtatCivilEnum;
import ma.inpt.cedoc.repositories.model.enums.utilisateur_enums.GenreEnum;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class CandidatResponseDTO extends BaseResponseDTO {

    private String nom;
    private String prenom;
    private String email;
    private String telephone;
    private LocalDate dateNaissance;

    private EtatCivilEnum etatCivilEnum;
    private GenreEnum genre;

    private boolean emailValider;
    private boolean archiver;

    private NationaliteResponseDTO nationalite;
    private LieuDeNaissanceResponseDTO lieuDeNaissance;

    private List<String> roleNames;
    private List<RoleResponseDTO> roles;

    private CandidatureResponseDTO candidature;
}
