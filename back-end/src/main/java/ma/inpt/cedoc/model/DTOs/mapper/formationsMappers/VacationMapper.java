package ma.inpt.cedoc.model.DTOs.mapper.formationsMappers;

import ma.inpt.cedoc.model.DTOs.Formations.VacationRequestDTO;
import ma.inpt.cedoc.model.DTOs.Formations.VacationResponseDTO;
import ma.inpt.cedoc.model.entities.formation.Vacation;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import org.springframework.stereotype.Component;

@Component
public class VacationMapper {

    public Vacation vacationRequestDTOToVacation(VacationRequestDTO dto) {
        if (dto == null) return null;

        Vacation vacation = new Vacation();
        vacation.setTitreDuCours(dto.getTitreDuCours());
        vacation.setEtablissement(dto.getEtablissement());
        vacation.setDate(dto.getDate());
        vacation.setNiveau(dto.getNiveau());
        vacation.setDuree(dto.getDuree());
        vacation.setJustificatif(dto.getJustificatif());
        vacation.setStatut(dto.getStatut());
        // doctorant is set manually in the service
        return vacation;
    }

    public VacationResponseDTO vacationToVacationResponseDTO(Vacation vacation) {
        if (vacation == null) return null;

        return VacationResponseDTO.builder()
                .id(vacation.getId())
                .titreDuCours(vacation.getTitreDuCours())
                .etablissement(vacation.getEtablissement())
                .date(vacation.getDate())
                .niveau(vacation.getNiveau())
                .duree(vacation.getDuree())
                .justificatif(vacation.getJustificatif())
                .statut(vacation.getStatut())
                .createdAt(vacation.getCreatedAt())
                .updatedAt(vacation.getUpdatedAt())
                .doctorantId(mapDoctorantId(vacation))
                .build();
    }

    public void updateVacationFromDTO(VacationRequestDTO dto, Vacation vacation) {
        if (dto == null || vacation == null) return;

        vacation.setTitreDuCours(dto.getTitreDuCours());
        vacation.setEtablissement(dto.getEtablissement());
        vacation.setDate(dto.getDate());
        vacation.setNiveau(dto.getNiveau());
        vacation.setDuree(dto.getDuree());
        vacation.setJustificatif(dto.getJustificatif());
        vacation.setStatut(dto.getStatut());
        // doctorant is left unchanged
    }

    /* -------------------------- HELPERS -------------------------- */

    private Long mapDoctorantId(Vacation vacation) {
        Doctorant doctorant = vacation.getDoctorant();
        return doctorant != null ? doctorant.getId() : null;
    }
}
