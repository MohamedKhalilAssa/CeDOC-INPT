package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;
import ma.inpt.cedoc.repositories.candidatureRepositories.CandidatureRepository;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ChefEquipeRepository;

@Service
@RequiredArgsConstructor
public class ChefEquipeServiceImpl implements ChefEquipeService {

    private final ChefEquipeRepository chefEquipeRepository;
    private final SujetRepository sujetRepository;
    private final CandidatureRepository candidatureRepository;

    @Override
    public ChefEquipe findById(Long id) {
        return chefEquipeRepository.findById(id).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Chef d'équipe introuvable")
        );
    }

    @Override
    public List<ChefEquipe> findAll() {
        return chefEquipeRepository.findAll();
    }

    @Override
    public boolean existsById(Long id) {
        return chefEquipeRepository.existsById(id);
    }

    @Override
    public List<Sujet> findSujetsByChefEquipeId(Long id) {
        return sujetRepository.findByChefEquipeId(id);
    }

    @Override
    public List<Candidature> findCandidaturesByChefEquipeId(Long id) {
        // On suppose que tous les sujets de ce chef ont des candidatures liées
        List<Sujet> sujets = sujetRepository.findByChefEquipeId(id);
        return candidatureRepository.findAll().stream()
                .filter(c -> c.getSujets() != null && c.getSujets().stream().anyMatch(sujets::contains))
                .toList();
    }

    @Override
    public boolean canAccessCandidature(Long chefEquipeId, Long candidatureId) {
        Candidature candidature = candidatureRepository.findById(candidatureId).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable")
        );

        return candidature.getSujets().stream()
                .anyMatch(s -> s.getChefEquipe().getId().equals(chefEquipeId));
    }

    @Override
    public Sujet validerSujet(Long chefEquipeId, Long sujetId) {
        Sujet sujet = sujetRepository.findById(sujetId)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sujet introuvable"));

        if (!sujet.getChefEquipe().getId().equals(chefEquipeId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Vous n'avez pas accès à ce sujet");
        }

        sujet.setValide(true);
        sujet.setEstPublic(true); // visibilité publique une fois validé
        return sujetRepository.save(sujet);
    }
}
