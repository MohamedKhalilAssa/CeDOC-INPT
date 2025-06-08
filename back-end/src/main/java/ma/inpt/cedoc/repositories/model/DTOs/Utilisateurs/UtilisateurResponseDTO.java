package ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs;

import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.repositories.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.repositories.model.enums.candidature_enums.StatutProfessionnelEnum;
import ma.inpt.cedoc.repositories.model.enums.utilisateur_enums.EtatCivilEnum;
import ma.inpt.cedoc.repositories.model.enums.utilisateur_enums.GenreEnum;

@Data
@EqualsAndHashCode(callSuper = true)
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class UtilisateurResponseDTO extends BaseResponseDTO {

    private String nom;

    private String prenom;

    private String email;

    private String telephone;

    private LocalDate dateNaissance;

    private EtatCivilEnum etatCivilEnum;

    private StatutProfessionnelEnum statutProfessionnel;

    private GenreEnum genre;

    private NationaliteResponseDTO nationalite;

    private LieuDeNaissanceResponseDTO lieuDeNaissance;

    private boolean emailValider;

    private List<String> roleNames;

    private List<RoleResponseDTO> roles;

}
