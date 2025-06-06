package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;
import java.util.stream.Collectors;

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

/**
 * Implémentation brute du service ChefEquipeService.
 * Toutes les opérations CRUD sont réalisées directement sur l'entité ChefEquipe.
 */
@Service
@RequiredArgsConstructor
public class ChefEquipeServiceImpl implements ChefEquipeService {

    private final ChefEquipeRepository chefEquipeRepository;
    private final SujetRepository sujetRepository;
    private final CandidatureRepository candidatureRepository;

    // ----------------- READ -----------------

    @Override
    public ChefEquipe findById(Long id) {
        return chefEquipeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chef d'équipe introuvable avec l'identifiant : " + id
            ));
    }

    @Override
    public List<ChefEquipe> findAll() {
        return chefEquipeRepository.findAll();
    }

    @Override
    public boolean existsById(Long id) {
        return chefEquipeRepository.existsById(id);
    }

    // ----------------- MÉTIER (liés aux sujets / candidatures) -----------------

    @Override
    public List<Sujet> findSujetsByChefEquipeId(Long id) {
        // Retourne les sujets dont le champ chefEquipe.id == id
        return sujetRepository.findByChefEquipeId(id);
    }

    @Override
    public List<Candidature> findCandidaturesByChefEquipeId(Long id) {
        // Récupérer tous les sujets de ce chef
        List<Sujet> sujets = sujetRepository.findByChefEquipeId(id);

        // Filtrer toutes les candidatures qui contiennent au moins un de ces sujets
        return candidatureRepository.findAll().stream()
                .filter(c -> c.getSujets() != null
                        && c.getSujets().stream().anyMatch(sujets::contains)
                )
                .collect(Collectors.toList());
    }

    @Override
    public boolean canAccessCandidature(Long chefEquipeId, Long candidatureId) {
        // Charger la candidature ou lever 404
        Candidature candidature = candidatureRepository.findById(candidatureId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Candidature introuvable avec l'identifiant : " + candidatureId
            ));

        // Si au moins un sujet de cette candidature appartient à ce chef, on renvoie true
        return candidature.getSujets().stream()
                .anyMatch(s -> s.getChefEquipe().getId().equals(chefEquipeId));
    }

    @Override
    public Sujet validerSujet(Long chefEquipeId, Long sujetId) {
        Sujet sujet = sujetRepository.findById(sujetId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Sujet introuvable avec l'identifiant : " + sujetId
            ));

        // On vérifie que le chef passé en paramètre correspond bien au chef du sujet
        if (!sujet.getChefEquipe().getId().equals(chefEquipeId)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Vous n'avez pas accès à ce sujet (chef id mismatch)."
            );
        }

        sujet.setValide(true);
        sujet.setEstPublic(true);  // on passe le sujet en “public” après validation
        return sujetRepository.save(sujet);
    }

    // ----------------- CREATE -----------------

    @Override
    public ChefEquipe createChefEquipe(ChefEquipe chefEquipe) {
        // (Optionnel : valider ici par exemple que l'email n'est pas déjà utilisé.)
        return chefEquipeRepository.save(chefEquipe);
    }

    // ----------------- UPDATE -----------------

    @Override
    public ChefEquipe updateChefEquipe(Long id, ChefEquipe chefEquipe) {
        // Charger l'entité existante ou lever 404
        ChefEquipe existing = chefEquipeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chef d'équipe introuvable avec l'identifiant : " + id
            ));

        // Mettre à jour les champs autorisés
        existing.setNom(chefEquipe.getNom());
        existing.setPrenom(chefEquipe.getPrenom());
        existing.setTelephone(chefEquipe.getTelephone());
        existing.setEmail(chefEquipe.getEmail());
        existing.setGrade(chefEquipe.getGrade());
        existing.setEquipeDeRechercheAcceuillante(chefEquipe.getEquipeDeRechercheAcceuillante());
        existing.setNationalite(chefEquipe.getNationalite());
        existing.setLieuDeNaissance(chefEquipe.getLieuDeNaissance());
        existing.setDateNaissance(chefEquipe.getDateNaissance());
        // Tout autre champ “simple” hérité de Utilisateur / Professeur
        // Si vous souhaitez déplacer le chef vers une autre équipe, faites :
        existing.setEquipeDeRecherche(chefEquipe.getEquipeDeRecherche());
        // (cette méthode `setEquipeDeRecherche(...)` vient de ChefEquipe côté entité)

        return chefEquipeRepository.save(existing);
    }

    // ----------------- DELETE -----------------

    @Override
    public void deleteChefEquipe(Long id) {
        ChefEquipe existing = chefEquipeRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chef d'équipe introuvable avec l'identifiant : " + id
            ));

        // Optionnel : vérifier d'abord qu'il n'a pas de sujets rattachés
        List<Sujet> linkedSujets = sujetRepository.findByChefEquipeId(id);
        if (!linkedSujets.isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Impossible de supprimer : ce chef d'équipe a encore des sujets rattachés."
            );
        }

        chefEquipeRepository.delete(existing);
    }
}
