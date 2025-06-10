package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;

@Component
public class CandidatureMapperImpl implements CandidatureMapper {

    @Override
    public Candidature toEntity(CandidatureRequestDTO dto) {
        Candidature c = Candidature.builder()
                .statutCandidature(CandidatureEnum.SOUMISE)
                .mentionBac(dto.getMentionBac())
                .mentionDiplome(dto.getMentionDiplome())
                // Le path du fichier sera mis à jour dans le service, pas ici
                .dossierCandidature("")
                .typeEtablissement(dto.getTypeEtablissement())
                .specialite(dto.getSpecialite())
                .intitulePFE(dto.getIntitulePFE())
                .candidat(null) // Will be resolved in the service layer
                .sujets(null) // la liste sera complétée en service
                .build();
        return c;
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
                .candidatNom(entity.getCandidat().getUtilisateur().getNom())
                .candidatPrenom(entity.getCandidat().getUtilisateur().getPrenom())
                .sujetsIds(
                        entity.getSujets() != null
                                ? entity.getSujets().stream()
                                        .map(s -> s.getId())
                                        .collect(Collectors.toList())
                                : List.of())
                .build();
    }

    /**
     * Safe mapping method that avoids deep entity loading and StackOverflow issues.
     * Use this for pagination and listing operations.
     */
    public CandidatureResponseDTO toResponseDTOSafe(Candidature entity) {
        List<Long> sujetIds = new ArrayList<>();
        
        // Safely extract sujet IDs without triggering full entity loading
        if (entity.getSujets() != null) {
            // Access only the ID field to avoid loading the full Sujet entity graph
            for (Sujet sujet : entity.getSujets()) {
                if (sujet != null && sujet.getId() != null) {
                    sujetIds.add(sujet.getId());
                }
            }
        }

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
                .candidatId(entity.getCandidat() != null ? entity.getCandidat().getId() : null)
                .candidatNom(entity.getCandidat() != null && entity.getCandidat().getUtilisateur() != null 
                        ? entity.getCandidat().getUtilisateur().getNom() : null)
                .candidatPrenom(entity.getCandidat() != null && entity.getCandidat().getUtilisateur() != null 
                        ? entity.getCandidat().getUtilisateur().getPrenom() : null)
                .sujetsIds(sujetIds)
                .build();
    }

    @Override
    public Candidat toCandidat(CandidatureRequestDTO dto) {
        // This method should not call external services to avoid circular dependencies
        // The service layer should handle entity resolution
        return null; // Will be resolved in the service layer
    }

}
