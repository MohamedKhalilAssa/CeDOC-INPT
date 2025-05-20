package ma.inpt.cedoc.service.CandidatureSevices;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.repositories.candidatureRepositories.CandidatureRepository;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.CandidatRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.EquipeDeRechercheRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ProfesseurRepository;

@Service
@RequiredArgsConstructor
public class CandidatureServiceImpl implements CandidatureService {

    private final CandidatureRepository candidatureRepository;
    private final CandidatRepository candidatRepository;
    private final SujetRepository sujetRepository;
    private final EquipeDeRechercheRepository equipeDeRechercheRepository;
    private final ProfesseurRepository professeurRepository;

    @Override
    public Candidature accepterCandidature(Long candidatureId, LocalDate entretien) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void fermerEtArchiverCompteCandidat(Long candidatId) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public List<EquipeDeRecherche> getAllEquipes() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Sujet> getAllPublicSujets() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Professeur> getProfesseursByEquipeId(Long equipeId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<Sujet> getSujetsByEquipeId(Long equipeId) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void propositionSujet(Long professeurId, Long sujetId) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public Candidature refuserCandidature(Long candidatureId, String motif) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Candidat registerCandidat(CandidatRequestDTO dto) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
