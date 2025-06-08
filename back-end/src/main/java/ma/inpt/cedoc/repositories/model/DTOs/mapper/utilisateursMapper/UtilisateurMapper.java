package ma.inpt.cedoc.repositories.model.DTOs.mapper.utilisateursMapper;

import java.util.List;

import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.*;
import ma.inpt.cedoc.repositories.model.DTOs.auth.RegisterRequestDTO;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.*;

public interface UtilisateurMapper {
    Utilisateur fromRequestDTO(UtilisateurRequestDTO dto);
    Utilisateur fromRegisterDTO(RegisterRequestDTO dto);
    UtilisateurResponseDTO toResponse(Utilisateur utilisateur);
    UtilisateurResponseDTO toResponseWithRoles(Utilisateur utilisateur);
    Utilisateur UpdateUtilisateurFromRequestDTO(Utilisateur utilisateur, UtilisateurRequestDTO dto);
    List<String> mapRoleNames(List<Role> roles);
    List<RoleResponseDTO> mapRolesToDTOs(List<Role> roles);
    NationaliteResponseDTO mapNationaliteToDTO(Nationalite nationalite);
    LieuDeNaissanceResponseDTO mapLieuDeNaissanceToDTO(LieuDeNaissance lieu);
}
