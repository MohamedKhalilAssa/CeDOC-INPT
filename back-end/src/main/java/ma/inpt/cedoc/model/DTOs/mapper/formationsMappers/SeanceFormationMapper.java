package ma.inpt.cedoc.model.DTOs.mapper.formationsMappers;

import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.ResponsableDeFormationRole;
import org.springframework.stereotype.Component;

@Component
public class SeanceFormationMapper {

    public SeanceFormation seanceFormationRequestDTOToSeanceFormation(SeanceFormationRequestDTO dto) {
        if (dto == null) return null;

        SeanceFormation seance = new SeanceFormation();
        seance.setDuree(dto.getDuree());
        seance.setJustificatifPdf(dto.getJustificatifPdf());
        seance.setStatut(dto.getStatut());
        // formation, declarant, and validePar are set manually later
        return seance;
    }

    public SeanceFormationResponseDTO seanceFormationToSeanceFormationResponseDTO(SeanceFormation seance) {
        if (seance == null) return null;

        return SeanceFormationResponseDTO.builder()
                .id(seance.getId())
                .duree(seance.getDuree())
                .justificatifPdf(seance.getJustificatifPdf())
                .statut(seance.getStatut())
                .createdAt(seance.getCreatedAt())
                .updatedAt(seance.getUpdatedAt())
                .formationId(mapFormationId(seance))
                .declarantId(mapDeclarantId(seance))
                .valideParId(mapValideParId(seance))
                .build();
    }

    public void updateSeanceFormationFromDTO(SeanceFormationRequestDTO dto, SeanceFormation entity) {
        if (dto == null || entity == null) return;

        entity.setDuree(dto.getDuree());
        entity.setJustificatifPdf(dto.getJustificatifPdf());
        entity.setStatut(dto.getStatut());
        // Do not override ids, formation, declarant, or validePar here
    }

    /*-------------------------- HELPERS --------------------------*/

    private Long mapFormationId(SeanceFormation seance) {
        Formation formation = seance.getFormation();
        return formation != null ? formation.getId() : null;
    }

    private Long mapDeclarantId(SeanceFormation seance) {
        Doctorant declarant = seance.getDeclarant();
        return declarant != null ? declarant.getId() : null;
    }

    private Long mapValideParId(SeanceFormation seance) {
        ResponsableDeFormationRole responsable = seance.getValidePar();
        return responsable != null ? responsable.getId() : null;
    }
}
