package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.*;
import ma.inpt.cedoc.model.DTOs.auth.RegisterRequestDTO;
import ma.inpt.cedoc.model.DTOs.mapper.MapperHelpers.utilisateurs.LieuDeNaissanceMapperHelper;
import ma.inpt.cedoc.model.DTOs.mapper.MapperHelpers.utilisateurs.NationaliteMapperHelper;
import ma.inpt.cedoc.model.entities.utilisateurs.*;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {
                NationaliteMapperHelper.class,
                LieuDeNaissanceMapperHelper.class }, unmappedTargetPolicy = org.mapstruct.ReportingPolicy.IGNORE)
public interface UtilisateurMapper {
    Utilisateur fromRequestDTO(UtilisateurRequestDTO dto);
    Utilisateur fromRegisterDTO(RegisterRequestDTO dto);
    UtilisateurResponseDTO toResponse(Utilisateur utilisateur);
    UtilisateurResponseDTO toResponseWithRoles(Utilisateur utilisateur);
    List<String> mapRoleNames(List<Role> roles);
    List<RoleResponseDTO> mapRolesToDTOs(List<Role> roles);
    NationaliteResponseDTO mapNationaliteToDTO(Nationalite nationalite);
    LieuDeNaissanceResponseDTO mapLieuDeNaissanceToDTO(LieuDeNaissance lieu);
}
