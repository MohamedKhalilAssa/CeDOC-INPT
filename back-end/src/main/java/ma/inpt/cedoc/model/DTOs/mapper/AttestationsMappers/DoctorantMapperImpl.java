package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import ma.inpt.cedoc.model.DTOs.Attestation.DoctorantRequestDTO;
import ma.inpt.cedoc.model.DTOs.Attestation.DoctorantResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.repositories.utilisateursRepositories.EquipeDeRechercheRepository;
import org.springframework.stereotype.Component;

@Component
public class DoctorantMapperImpl implements DoctorantMapper {

    private EquipeDeRechercheRepository equipeDeRechercheRepository;
    @Override
    public Doctorant doctorantRequestDTOToDoctorant(DoctorantRequestDTO dto) {
        if (dto == null) return null;

        Doctorant doctorant = new Doctorant();
        doctorant.setUtilisateur(dto.getUtilisateur());
        doctorant.setCin(dto.getCin());
        doctorant.setCne(dto.getCne());
        doctorant.setAnneeEnCours(dto.getCurrentYear());
        doctorant.setNiveauActuel(dto.getCurrentLevel());
        doctorant.setCycle(dto.getCycle());

        EquipeDeRecherche equipe = mapEquipe(dto.getResearchTeamId());
        doctorant.setEquipeDeRecherche(equipe);

        return doctorant;
    }

    private EquipeDeRecherche mapEquipe(Long id) {
        if (id == null) {
            return null;
        }
        return equipeDeRechercheRepository.findById(id).orElse(null);
    }

    public DoctorantResponseDTO doctorantToDoctorantResponseDTO(Doctorant doctorant){
        DoctorantResponseDTO dto = new DoctorantResponseDTO();

        dto.setUtilisateur(doctorant.getUtilisateur());
        dto.setCin(doctorant.getCin());
        dto.setCne(doctorant.getCne());
        dto.setFirstEnrollmentDate(doctorant.getDateInscription());
        dto.setCurrentYear(doctorant.getAnneeEnCours());
        dto.setCurrentLevel(doctorant.getNiveauActuel());
        dto.setCycle(doctorant.getCycle());
        dto.setResearchTeamId(doctorant.getEquipeDeRecherche().getId());
        // Only set attestation type if available
        if (doctorant.getAttestationAutomatique() != null) {
            dto.setTypeAttestationAuto(doctorant.getAttestationAutomatique().getTypeAttestationAutomatique());
        }

        if (doctorant.getAttestationAvecValidation() != null) {
            dto.setTypeAttestationValidation(doctorant.getAttestationAvecValidation().getTypeAttestationValidation());
        }

        return dto;
    }
}
