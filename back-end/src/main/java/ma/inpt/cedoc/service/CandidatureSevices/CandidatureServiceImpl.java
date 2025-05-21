package ma.inpt.cedoc.service.CandidatureSevices;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.CandidatMapper;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;
import ma.inpt.cedoc.repositories.candidatureRepositories.CandidatureRepository;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.CandidatRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.EquipeDeRechercheRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ProfesseurRepository;
import ma.inpt.cedoc.service.utilisateurServices.CandidatService;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidatureServiceImpl implements CandidatureService {

    private final CandidatureRepository candidatureRepository;
    private final CandidatRepository candidatRepository;
    private final SujetRepository sujetRepository;
    private final EquipeDeRechercheRepository equipeDeRechercheRepository;
    private final ProfesseurRepository professeurRepository;

    private final CandidatService candidatService;
    private final CandidatMapper candidatMapper;

    @Override
    public Candidature accepterCandidature(Long candidatureId, LocalDate entretien) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(404, "Candidature introuvable", null));

        candidature.setStatutCandidature(CandidatureEnum.ACCEPTER);
        // Optional: stocker la date d’entretien si le champ existe
        return candidatureRepository.save(candidature);
    }

    @Override
    public Candidature refuserCandidature(Long candidatureId, String motif) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(404, "Candidature introuvable", null));

        candidature.setStatutCandidature(CandidatureEnum.REFUSER);
        // Le champ "motif" peut être ajouté dans l’entité si besoin
        return candidatureRepository.save(candidature);
    }

    @Override
    public void fermerEtArchiverCompteCandidat(Long candidatId) {
        Candidat candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new ResponseStatusException(404, "Candidat introuvable", null));

        candidat.setArchiver(true);
        candidatRepository.save(candidat);
        // Optionnel : suppression après délai (automatisée par tâche cron ou batch)
    }

    @Override
    public List<EquipeDeRecherche> getAllEquipes() {
        return equipeDeRechercheRepository.findAll();
    }

    @Override
    public List<Sujet> getAllPublicSujets() {
        return sujetRepository.findAll().stream()
                .filter(Sujet::isEstPublic)
                .toList();
    }

    @Override
    public List<Professeur> getProfesseursByEquipeId(Long equipeId) {
        return professeurRepository.findAll().stream()
                .filter(p -> p.getEquipeDeRechercheAcceuillante() != null
                        && p.getEquipeDeRechercheAcceuillante().getId().equals(equipeId))
                .toList();
    }

    @Override
    public List<Sujet> getSujetsByEquipeId(Long equipeId) {
        return sujetRepository.findByChefEquipeId(equipeId);
    }

    @Override
    public void propositionSujet(Long professeurId, Long sujetId) {
        Professeur professeur = professeurRepository.findById(professeurId)
                .orElseThrow(() -> new ResponseStatusException(404, "Professeur introuvable", null));

        Sujet sujet = sujetRepository.findById(sujetId)
                .orElseThrow(() -> new ResponseStatusException(404, "Sujet introuvable", null));

        sujet.getProfesseurs().add(professeur);
        sujetRepository.save(sujet);
    }

    @Override
    public CandidatResponseDTO registerCandidat(CandidatRequestDTO dto) {
        Candidat candidat = candidatMapper.toEntity(dto);
        return candidatService.saveCandidat(candidat);
    }
}
