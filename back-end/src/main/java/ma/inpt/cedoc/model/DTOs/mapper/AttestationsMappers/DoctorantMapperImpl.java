package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import ma.inpt.cedoc.model.DTOs.Attestation.DoctorantRequestDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import org.springframework.stereotype.Component;

@Component
public class DoctorantMapperImpl implements DoctorantMapper {
    @Override
    public Doctorant doctorantRequestDTOToDoctorant(DoctorantRequestDTO dto) {
        if (dto == null) return null;

        Doctorant doctorant = new Doctorant();
        doctorant.setNom(dto.getNom());
        doctorant.setPrenom(dto.getPrenom());
        doctorant.setEmail(dto.getEmail());
        doctorant.setCin(dto.getCin());
        doctorant.setCne(dto.getCne());
        doctorant.setDateNaissance(dto.getBirthDate());
        doctorant.setLieuDeNaissance(dto.getBirthPlace());
        doctorant.setEquipeDeRecherche(dto.getResearchTeam());
        doctorant.setAnneeEnCours(dto.getCurrentYear());
        doctorant.setNiveauActuel(dto.getCurrentLevel());
        doctorant.setCycle(dto.getCycle());
        return doctorant;
    }
}
