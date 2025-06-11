package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.DoctorantResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

@Component
public class DoctorantMapperImpl implements DoctorantMapper {
    @Override
    public DoctorantResponseDTO toDto(Doctorant d) {
        return DoctorantResponseDTO.builder()
                .id(d.getId())
                .nom(d.getUtilisateur().getNom())
                .prenom(d.getUtilisateur().getPrenom())
                .email(d.getUtilisateur().getEmail())
                .telephone(d.getUtilisateur().getTelephone())
                .dateInscription(d.getDateInscription())
                .statutDoctorant(d.getStatutDoctorant())
                .nombreHeuresLabo(d.getNombreHeuresLabo())
                .draftDiplomeUrl(d.getDraftDiplomeUrl())
                .archiver(d.isArchiver())
                .build();
    }

    @Override
    public List<DoctorantResponseDTO> toDtoList(List<Doctorant> doctorants) {
        if (doctorants == null) {
            return null;
        }
        return doctorants.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
}
