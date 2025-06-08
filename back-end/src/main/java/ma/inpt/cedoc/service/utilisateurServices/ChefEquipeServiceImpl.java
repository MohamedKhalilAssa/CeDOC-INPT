package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.repositories.candidatureRepositories.CandidatureRepository;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ChefEquipeRoleRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class ChefEquipeServiceImpl implements ChefEquipeService {

    private final ChefEquipeRoleRepository chefEquipeRoleRepository;
    private final SujetRepository sujetRepository;
    private final CandidatureRepository candidatureRepository;
    private final ProfesseurService professeurService;

    // ───–──── READ BASIQUES ───–────

    @Override
    public ChefEquipeRole findById(Long id) {
        return chefEquipeRoleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Chef d’équipe introuvable avec l’identifiant : " + id));
    }

    @Override
    public ChefEquipeRole findByEmail(String email) {
        return chefEquipeRoleRepository.findByProfesseurUtilisateurEmail(email)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Chef d’équipe introuvable avec l’email : " + email));
    }

    @Override
    public List<ChefEquipeRole> findAll() {
        return chefEquipeRoleRepository.findAll();
    }

    @Override
    public boolean existsById(Long id) {
        return chefEquipeRoleRepository.existsById(id);
    }

    // ───–──── MÉTIER “SUJETS / CANDIDATURES” ───–────

    @Override
    public List<Sujet> findSujetsByChefEquipeId(Long chefId) {
        // Hypothèse : SujetRepository a déjà une méthode findByChefEquipeId
        return sujetRepository.findByChefEquipeId(chefId);
    }

    @Override
    public List<Candidature> findCandidaturesByChefEquipeId(Long chefId) {
        // 1) Récupérer tous les Sujets gérés par ce chef
        List<Sujet> sujets = sujetRepository.findByChefEquipeId(chefId);

        // 2) Retourner toutes les candidatures contenant au moins l’un de ces sujets
        return candidatureRepository.findAll().stream()
                .filter(c -> c.getSujets() != null
                        && c.getSujets().stream().anyMatch(sujets::contains))
                .collect(Collectors.toList());
    }

    @Override
    public boolean canAccessCandidature(Long chefEquipeId, Long candidatureId) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Candidature introuvable avec l’identifiant : " + candidatureId));

        // Si au moins un Sujet de la candidature appartient à ce chef, on retourne true
        return candidature.getSujets().stream()
                .anyMatch(s -> s.getChefEquipe().getId().equals(chefEquipeId));
    }

    @Override
    public Sujet validerSujet(Long chefEquipeId, Long sujetId) {
        Sujet sujet = sujetRepository.findById(sujetId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Sujet introuvable avec l’identifiant : " + sujetId));

        // Vérifier que le sujet appartient bien à ce chef
        if (!sujet.getChefEquipe().getId().equals(chefEquipeId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Vous n’avez pas accès à ce sujet (chef id mismatch).");
        }
        sujet.setValide(true);
        sujet.setEstPublic(true);
        return sujetRepository.save(sujet);
    }

    // ───–──── HELPER METHODS ───–────

    /**
     * Assigne automatiquement le professeur à l'équipe de recherche du rôle chef
     * d'équipe
     * si le professeur n'est pas déjà assigné à cette équipe.
     */
    private void assignProfesseurToEquipeIfNeeded(ChefEquipeRole chefEquipeRole) {
        if (chefEquipeRole == null || chefEquipeRole.getProfesseur() == null) {
            return;
        }

        Professeur professeur = chefEquipeRole.getProfesseur();
        EquipeDeRecherche equipeDeRecherche = chefEquipeRole.getEquipeDeRecherche();

        if (equipeDeRecherche == null) {
            return;
        }

        // Si le professeur n'est pas déjà assigné à cette équipe, l'assigner
        if (professeur.getEquipeDeRechercheAcceuillante() == null ||
                !professeur.getEquipeDeRechercheAcceuillante().getId().equals(equipeDeRecherche.getId())) {

            professeur.setEquipeDeRechercheAcceuillante(equipeDeRecherche);
            professeurService.updateProfesseur(professeur.getId(), professeur);
        }
    }

    // ───–──── CRUD POUR ChefEquipeRole ───–────

    @Override
    public ChefEquipeRole createChefEquipe(ChefEquipeRole chefEquipeRole) {
        // (Optionnel : vérifier qu'on n’a pas déjà un rôle pour ce professeur, etc.)
        ChefEquipeRole savedChefEquipe = chefEquipeRoleRepository.save(chefEquipeRole);

        // Assigner automatiquement le professeur à l'équipe de recherche
        assignProfesseurToEquipeIfNeeded(savedChefEquipe);

        return savedChefEquipe;
    }

    @Override
    public ChefEquipeRole updateChefEquipe(Long id, ChefEquipeRole dto) {
        ChefEquipeRole existing = chefEquipeRoleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Chef d’équipe introuvable avec l’identifiant : " + id));

        // On met à jour uniquement les champs modifiables :
        // Ici, un ChefEquipeRole ne contient que “professeur”, “equipesDeRecherche” et
        // “sujets”.
        // Typiquement, on ne met à jour QUE le professeur assigné :
        existing.setProfesseur(dto.getProfesseur());

        // Si vous souhaitez permettre de mettre à jour la liste d’équipes ou de sujets,
        // vous pouvez le faire ici. Par exemple :
        // existing.setEquipesDeRecherche(dto.getEquipesDeRecherche());

        ChefEquipeRole updatedChefEquipe = chefEquipeRoleRepository.save(existing);

        // Assigner automatiquement le professeur à l'équipe de recherche
        assignProfesseurToEquipeIfNeeded(updatedChefEquipe);

        return updatedChefEquipe;
    }

    @Override
    public void deleteChefEquipe(Long id) {
        ChefEquipeRole existing = chefEquipeRoleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Chef d’équipe introuvable avec l’identifiant : " + id));

        // Empêcher la suppression si le chef a encore des sujets attachés
        if (!existing.getSujets().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Impossible de supprimer : ce chef d’équipe a encore des sujets rattachés.");
        }

        chefEquipeRoleRepository.delete(existing);
    }

    @Override
    public Page<Sujet> findSujetsMembreEquipes(ChefEquipeRole chef, Pageable pageable) {

        EquipeDeRecherche equipe = chef.getEquipeDeRecherche();

        if (equipe == null) {
            // ERREUR LOGIQUE
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Aucune équipe de recherche associée à ce chef d'équipe.");
        }
        List<Professeur> membres = equipe.getMembres();
        if (membres == null || membres.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Aucun membre trouvé dans l'équipe de recherche associée à ce chef d'équipe.");
        }
        // Get member IDs for the many-to-many query
        List<Long> membreIds = membres.stream()
                .map(Professeur::getId)
                .collect(Collectors.toList());

        // Use the corrected repository method for many-to-many relationship
        return sujetRepository.findByProfesseursIdIn(membreIds, pageable);

    }

}
