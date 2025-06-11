package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.DoctorantResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

public interface DoctorantMapper {
    DoctorantResponseDTO toDto(Doctorant doctorant);
    List<DoctorantResponseDTO> toDtoList(List<Doctorant> doctorants);
}
