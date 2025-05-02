package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

@Mapper(componentModel = "spring")
public interface UtilisateurMapper {
    UtilisateurMapper INSTANCE = Mappers.getMapper(UtilisateurMapper.class);

    // Mapping method for converting DTO to Entity
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "lieuDeNaissance", ignore = true)
    @Mapping(target = "nationalite", ignore = true)
    @Mapping(target = "roles", ignore = true)
    @Mapping(target = "tokens", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Utilisateur utilisateurDTOToUtilisateur(UtilisateurDTO utilisateurDTO);

    // Mapping method for converting Entity to DTO
    UtilisateurDTO utilisateurToUtilisateurDTO(Utilisateur utilisateur);
}
