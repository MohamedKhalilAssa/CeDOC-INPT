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
        doctorant.getUtilisateur().setNom(dto.getNom());
        doctorant.getUtilisateur().setPrenom(dto.getPrenom());
        doctorant.getUtilisateur().setEmail(dto.getEmail());
        doctorant.setCin(dto.getCin());
        doctorant.setCne(dto.getCne());
        doctorant.getUtilisateur().setDateNaissance(dto.getBirthDate());
        doctorant.getUtilisateur().setLieuDeNaissance(dto.getBirthPlace());
        doctorant.setEquipeDeRecherche(dto.getResearchTeam());
        doctorant.setAnneeEnCours(dto.getCurrentYear());
        doctorant.setNiveauActuel(dto.getCurrentLevel());
        doctorant.setCycle(dto.getCycle());
        return doctorant;
    }
}
