package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;
import ma.inpt.cedoc.service.utilisateurServices.CandidatService;

@Component
@RequiredArgsConstructor
public class CandidatureMapperImpl implements CandidatureMapper {

    private final CandidatService candidatService;

    @Override
    public Candidature toEntity(CandidatureRequestDTO dto) {
        Candidat candidat = candidatService.findFullCandidatById(dto.getCandidatId());
        return Candidature.builder()
                .statutCandidature(CandidatureEnum.SOUMISE)
                .mentionBac(dto.getMentionBac())
                .diplome(dto.getDiplome())
                .mentionDiplome(dto.getMentionDiplome())
                // .dossierCandidature(dto.getDossierCandidature())
                .typeEtablissement(dto.getTypeEtablissement())
                .specialite(dto.getSpecialite())
                .intitulePFE(dto.getIntitulePFE())
                .candidat(candidat)
                .sujets(null)
                .build();
    }

    @Override
    public CandidatureResponseDTO toResponseDTO(Candidature entity) {
        return CandidatureResponseDTO.builder()
                .id(entity.getId())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .statutCandidature(entity.getStatutCandidature())
                .mentionBac(entity.getMentionBac())
                .diplome(entity.getDiplome())
                .mentionDiplome(entity.getMentionDiplome())
                .dossierCandidature(entity.getDossierCandidature())
                .typeEtablissement(entity.getTypeEtablissement())
                .specialite(entity.getSpecialite())
                .intitulePFE(entity.getIntitulePFE())
                .candidatId(entity.getCandidat().getId())
                .sujetsIds(entity.getSujets() != null ? entity.getSujets().stream().map(s -> s.getId()).toList()
                        : List.of())
                .build();
    }
}
