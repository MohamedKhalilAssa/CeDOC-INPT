package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.candidatureRepositories.CandidatureRepository;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.model.entities.candidature.Candidature;
import ma.inpt.cedoc.repositories.model.entities.candidature.Sujet;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.ChefEquipeRole;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ChefEquipeRoleRepository;

@Service
@RequiredArgsConstructor
public class ChefEquipeServiceImpl implements ChefEquipeService {

    private final ChefEquipeRoleRepository chefEquipeRoleRepository;
    private final SujetRepository sujetRepository;
    private final CandidatureRepository candidatureRepository;

    // ───–──── READ BASIQUES ───–────

    @Override
    public ChefEquipeRole findById(Long id) {
        return chefEquipeRoleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chef d’équipe introuvable avec l’identifiant : " + id
            ));
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
                "Candidature introuvable avec l’identifiant : " + candidatureId
            ));

        // Si au moins un Sujet de la candidature appartient à ce chef, on retourne true
        return candidature.getSujets().stream()
            .anyMatch(s -> s.getChefEquipe().getId().equals(chefEquipeId));
    }

    @Override
    public Sujet validerSujet(Long chefEquipeId, Long sujetId) {
        Sujet sujet = sujetRepository.findById(sujetId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Sujet introuvable avec l’identifiant : " + sujetId
            ));

        // Vérifier que le sujet appartient bien à ce chef
        if (!sujet.getChefEquipe().getId().equals(chefEquipeId)) {
            throw new ResponseStatusException(
                HttpStatus.FORBIDDEN,
                "Vous n’avez pas accès à ce sujet (chef id mismatch)."
            );
        }

        sujet.setValide(true);
        sujet.setEstPublic(true);
        return sujetRepository.save(sujet);
    }

    // ───–──── CRUD POUR ChefEquipeRole ───–────

    @Override
    public ChefEquipeRole createChefEquipe(ChefEquipeRole chefEquipeRole) {
        // (Optionnel : vérifier qu'on n’a pas déjà un rôle pour ce professeur, etc.)
        return chefEquipeRoleRepository.save(chefEquipeRole);
    }

    @Override
    public ChefEquipeRole updateChefEquipe(Long id, ChefEquipeRole dto) {
        ChefEquipeRole existing = chefEquipeRoleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chef d’équipe introuvable avec l’identifiant : " + id
            ));

        // On met à jour uniquement les champs modifiables :
        // Ici, un ChefEquipeRole ne contient que “professeur”, “equipesDeRecherche” et “sujets”.
        // Typiquement, on ne met à jour QUE le professeur assigné :
        existing.setProfesseur(dto.getProfesseur());

        // Si vous souhaitez permettre de mettre à jour la liste d’équipes ou de sujets,
        // vous pouvez le faire ici. Par exemple :
        // existing.setEquipesDeRecherche(dto.getEquipesDeRecherche());

        return chefEquipeRoleRepository.save(existing);
    }

    @Override
    public void deleteChefEquipe(Long id) {
        ChefEquipeRole existing = chefEquipeRoleRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND,
                "Chef d’équipe introuvable avec l’identifiant : " + id
            ));

        // Empêcher la suppression si le chef a encore des sujets attachés
        if (!existing.getSujets().isEmpty()) {
            throw new ResponseStatusException(
                HttpStatus.BAD_REQUEST,
                "Impossible de supprimer : ce chef d’équipe a encore des sujets rattachés."
            );
        }

        chefEquipeRoleRepository.delete(existing);
    }
    
}
