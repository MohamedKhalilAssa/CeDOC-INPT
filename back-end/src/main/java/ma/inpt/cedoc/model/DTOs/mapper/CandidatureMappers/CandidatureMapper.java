package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;
import ma.inpt.cedoc.service.utilisateurServices.CandidatService;

@Component
@RequiredArgsConstructor
public class CandidatureMapper {

    private final CandidatService candidatService;

    public Candidature toEntity(CandidatureRequestDTO dto) {
        Candidat candidat = candidatService.findFullCandidatById(dto.getCandidatId());

        return Candidature.builder()
                .statutCandidature(CandidatureEnum.SOUMISE) // état initial par défaut
                .mentionBac(dto.getMentionBac())
                .mentionDiplome(dto.getMentionDiplome())
                .dossierCandidature(dto.getDossierCandidature())
                .typeEtablissement(dto.getTypeEtablissement())
                .specialite(dto.getSpecialite())
                .intitulePFE(dto.getIntitulePFE())
                .statutProfessionnel(dto.getStatutProfessionnel())
                .candidat(candidat)
                .sujets(null) // à associer dans un service séparé (si nécessaire)
                .build();
    }
}
