package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.*;
import ma.inpt.cedoc.model.DTOs.auth.RegisterRequestDTO;
import ma.inpt.cedoc.model.DTOs.mapper.MapperHelpers.utilisateurs.LieuDeNaissanceMapperHelper;
import ma.inpt.cedoc.model.DTOs.mapper.MapperHelpers.utilisateurs.NationaliteMapperHelper;
import ma.inpt.cedoc.model.entities.utilisateurs.LieuDeNaissance;
import ma.inpt.cedoc.model.entities.utilisateurs.Nationalite;
import ma.inpt.cedoc.model.entities.utilisateurs.Role;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR, uses = {
                NationaliteMapperHelper.class,
                LieuDeNaissanceMapperHelper.class })
public interface UtilisateurMapper {

        // Mapping method for converting DTO to Entity
        /* UTILISATEUR_REQUEST TO UTILISATEUR */
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "roles", ignore = true)
        @Mapping(target = "tokens", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "emailValider", ignore = true)
        @Mapping(target = "nationalite", source = "nationaliteId", qualifiedByName = "mapNationalite")
        @Mapping(target = "lieuDeNaissance", source = "lieuDeNaissanceId", qualifiedByName = "mapLieuDeNaissance")
        Utilisateur utilisateurRequestDTOToUtilisateur(UtilisateurRequestDTO utilisateurDTO);

        /* REGISTER REQUEST TO UTILISATEUR */
        @Mapping(target = "createdAt", ignore = true)
        @Mapping(target = "id", ignore = true)
        @Mapping(target = "roles", ignore = true)
        @Mapping(target = "tokens", ignore = true)
        @Mapping(target = "updatedAt", ignore = true)
        @Mapping(target = "emailValider", ignore = true)
        @Mapping(target = "nationalite", ignore = true)
        @Mapping(target = "lieuDeNaissance", ignore = true)
        @Mapping(target = "dateNaissance", ignore = true)
        @Mapping(target = "etatCivilEnum", ignore = true)
        @Mapping(target = "genre", ignore = true)
        @Mapping(target = "nom", ignore = true)
        @Mapping(target = "prenom", ignore = true)
        @Mapping(target = "telephone", ignore = true)
        Utilisateur RegisterRequestDTOToUtilisateur(RegisterRequestDTO utilisateurDTO);

        @Mappings({
                        @Mapping(target = "roles", ignore = true),
                        @Mapping(target = "roleNames", expression = "java(mapRoleNames(utilisateur.getRoles()))"),
                        @Mapping(target = "nationalite", source = "nationalite"),
                        @Mapping(target = "lieuDeNaissance", source = "lieuDeNaissance")
        })
        // Mapping method for converting Entity to DTO
        UtilisateurResponseDTO utilisateurToUtilisateurResponseDTO(Utilisateur utilisateur);

        // Mapping from Utilisateur to UtilisateurResponseDTO with roles fully included
        @Mappings({
                        @Mapping(target = "roleNames", ignore = true),
                        @Mapping(target = "roles", expression = "java(mapRolesToDTOs(utilisateur.getRoles()))"),
                        @Mapping(target = "nationalite", source = "nationalite"),
                        @Mapping(target = "lieuDeNaissance", source = "lieuDeNaissance")
        })
        UtilisateurResponseDTO utilisateurToUtilisateurResponseDTOFullRoles(Utilisateur utilisateur);

        /*--------------------------------------------------------------HELPERS -------------------------------------------------------------------------------------------*/

        // Helper method to map Role to a list of role names (List<String>)
        default List<String> mapRoleNames(List<Role> roles) {
                return roles.stream()
                                .map(Role::getIntitule)
                                .collect(Collectors.toList());
        }

        default List<RoleResponseDTO> mapRolesToDTOs(List<Role> roles) {
                return roles.stream()
                                .map(role -> RoleResponseDTO.builder()
                                                .id(role.getId())
                                                .intitule(role.getIntitule())
                                                .createdAt(role.getCreatedAt())
                                                .updatedAt(role.getUpdatedAt())
                                                .build())
                                .collect(Collectors.toList());
        }
        // Mapping from Nationalite to NationaliteResponseDTO

        default NationaliteResponseDTO mapNationaliteToDTO(Nationalite nationalite) {
                if (nationalite == null) {
                        return null;
                }
                return NationaliteResponseDTO.builder()
                                .id(nationalite.getId())
                                .intitule(nationalite.getIntitule())
                                .createdAt(nationalite.getCreatedAt())
                                .updatedAt(nationalite.getUpdatedAt())
                                .build();
        }

        // Mapping from LieuDeNaissance to LieuDeNaissanceResponseDTO
        default LieuDeNaissanceResponseDTO mapLieuDeNaissanceToDTO(LieuDeNaissance lieuDeNaissance) {
                if (lieuDeNaissance == null) {
                        return null;
                }
                return LieuDeNaissanceResponseDTO.builder()
                                .id(lieuDeNaissance.getId())
                                .pays(lieuDeNaissance.getPays())
                                .ville(lieuDeNaissance.getVille())
                                .build();
        }
}