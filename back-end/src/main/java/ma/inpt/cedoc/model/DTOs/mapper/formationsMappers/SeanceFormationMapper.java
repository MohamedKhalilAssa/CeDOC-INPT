package ma.inpt.cedoc.model.DTOs.mapper.formationsMappers;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.SeanceFormationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.ResponsableDeFormationRole;
import ma.inpt.cedoc.repositories.formationRepositories.FormationRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ResponsableDeFormationRoleRepository;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SeanceFormationMapper {

    private final ResponsableDeFormationRoleRepository responsableDeFormationRoleRepository;
    private final FormationRepository formationRepository;
    private final DoctorantRepository doctorantRepository;

    public SeanceFormation seanceFormationRequestDTOToSeanceFormation(SeanceFormationRequestDTO dto) {
        if (dto == null) return null;

        // Fetch and validate related entities
        Formation formation = formationRepository.findById(dto.getFormationId())
                .orElseThrow(() -> new EntityNotFoundException("Formation not found with id: " + dto.getFormationId()));

        Doctorant declarant = doctorantRepository.findByUtilisateurId(dto.getDeclarantId())
                .orElseThrow(() -> new EntityNotFoundException("Doctorant not found for user id: " + dto.getDeclarantId()));

        // Build entity
        SeanceFormation seance = new SeanceFormation();
        seance.setDuree(dto.getDuree());
        seance.setJustificatifPdf(dto.getJustificatifPdf());
        seance.setStatut(dto.getStatut());
        seance.setFormation(formation);
        seance.setDeclarant(declarant);
        seance.setValidePar(getResponsableIfExists(dto.getValideParId()));

        return seance;
    }

    private ResponsableDeFormationRole getResponsableIfExists(Long id) {
        if (id == null) return null;
        return responsableDeFormationRoleRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Responsable not found with id: " + id));
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
                .formation(mapFormationId(seance))
                .declarantId(mapDeclarantId(seance))
                .validePar(mapValideParId(seance))
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

    private String mapFormationId(SeanceFormation seance) {
        Formation formation = seance.getFormation();
        return formation != null ? formation.getFormationName() : null;
    }

    private Long mapDeclarantId(SeanceFormation seance) {
        Doctorant declarant = seance.getDeclarant();
        return declarant != null ? declarant.getId() : null;
    }

    private String mapValideParId(SeanceFormation seance) {
        ResponsableDeFormationRole responsable = seance.getValidePar();
        return responsable != null ? responsable.getProfesseur().getUtilisateur().getNom() +" "+ responsable.getProfesseur().getUtilisateur().getPrenom() : null;
    }
}
