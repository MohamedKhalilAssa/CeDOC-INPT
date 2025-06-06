package ma.inpt.cedoc.web.Utilisateurs;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetEquipeDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.ChefSujetsResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.SujetEquipeMapperImpl;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.ChefEquipeMapperImpl;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;
import ma.inpt.cedoc.service.CandidatureSevices.SujetService;
import ma.inpt.cedoc.service.utilisateurServices.ChefEquipeService;

@RestController
@RequestMapping("/api/chefs-equipe")
@RequiredArgsConstructor
public class ChefEquipeController {

    private final ChefEquipeService chefEquipeService;
    private final ChefEquipeMapperImpl chefEquipeMapper;
    private final SujetService sujetService;
    private final SujetEquipeMapperImpl sujetEquipeMapper;

    /**
     * GET /api/chefs-equipe/chefs-sujets
     * Renvoie la liste de tous les Chefs d’équipe avec leurs sujets (DTO).
     */
    @GetMapping("/chefs-sujets")
    public ResponseEntity<List<ChefSujetsResponseDTO>> getChefsAvecLeursSujets() {
        List<ChefEquipe> tousLesChefs = chefEquipeService.findAll();
        List<ChefSujetsResponseDTO> dtoList = chefEquipeMapper.toDtoList(tousLesChefs);
        return ResponseEntity.ok(dtoList);
    }

    /**
     * GET /api/chefs-equipe/sujets-equipes
     * Renvoie pour chaque Sujet public son intitulé et le nom de l’équipe.
     */
    @GetMapping("/sujets-equipes")
    public ResponseEntity<List<SujetEquipeDTO>> getAllSujetsAvecEquipe() {
        List<Sujet> entities = sujetService.getAllPublicSujets().stream()
            .map(dto -> sujetService.getSujetEntityById(dto.getId()))
            .collect(Collectors.toList());

        List<SujetEquipeDTO> dtoList = entities.stream()
            .map(sujetEquipeMapper::toDto)
            .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    // ───–──── CRUD “tout brut” pour ChefEquipe ───–────

    /**
     * POST /api/chefs-equipe
     * Crée un nouveau ChefEquipe (en envoyant un JSON correspondant à l’entité ChefEquipe).
     */
    @PostMapping
    public ResponseEntity<ChefEquipe> createChef(@RequestBody ChefEquipe chefEquipe) {
        ChefEquipe saved = chefEquipeService.createChefEquipe(chefEquipe);
        return ResponseEntity.status(201).body(saved);
    }

    /**
     * GET /api/chefs-equipe
     * Renvoie la liste brute de tous les ChefEquipe (entités complètes).
     */
    @GetMapping
    public ResponseEntity<List<ChefEquipe>> getAllChefs() {
        List<ChefEquipe> list = chefEquipeService.findAll();
        return ResponseEntity.ok(list);
    }

    /**
     * GET /api/chefs-equipe/{id}
     * Renvoie le ChefEquipe dont l’id vaut {id}, ou 404 s’il n’existe pas.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ChefEquipe> getChefById(@PathVariable Long id) {
        ChefEquipe chef = chefEquipeService.findById(id);
        return ResponseEntity.ok(chef);
    }

    /**
     * PUT /api/chefs-equipe/{id}
     * Met à jour le ChefEquipe d’identifiant {id}, avec les valeurs fournies dans le JSON.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ChefEquipe> updateChef(
            @PathVariable Long id,
            @RequestBody ChefEquipe chefEquipe
    ) {
        ChefEquipe updated = chefEquipeService.updateChefEquipe(id, chefEquipe);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/chefs-equipe/{id}
     * Supprime le ChefEquipe d’identifiant {id}. Retourne 204 si la suppression réussit.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteChef(@PathVariable Long id) {
        chefEquipeService.deleteChefEquipe(id);
        return ResponseEntity.noContent().build();
    }

    // ───–──── Méthodes métier exposées comme avant ───–────

    /**
     * GET /api/chefs-equipe/{id}/sujets
     * Renvoie la liste des Sujets gérés par ce chef (entités brutes Sujet).
     */
    @GetMapping("/{id}/sujets")
    public ResponseEntity<List<Sujet>> getSujetsByChef(@PathVariable Long id) {
        List<Sujet> sujets = chefEquipeService.findSujetsByChefEquipeId(id);
        return ResponseEntity.ok(sujets);
    }

    /**
     * GET /api/chefs-equipe/{id}/candidatures
     * Renvoie la liste brute des Candidatures associées aux sujets de ce chef.
     */
    @GetMapping("/{id}/candidatures")
    public ResponseEntity<List<ma.inpt.cedoc.model.entities.candidature.Candidature>> getCandidaturesByChef(@PathVariable Long id) {
        List<ma.inpt.cedoc.model.entities.candidature.Candidature> candidatures = chefEquipeService.findCandidaturesByChefEquipeId(id);
        return ResponseEntity.ok(candidatures);
    }

    /**
     * POST /api/chefs-equipe/{chefId}/valider-sujet/{sujetId}
     * Valide le sujet sujetId pour le chef chefId. Renvoie l’entité Sujet mise à jour.
     */
    @PostMapping("/{chefId}/valider-sujet/{sujetId}")
    public ResponseEntity<Sujet> validerSujet(
            @PathVariable Long chefId,
            @PathVariable Long sujetId
    ) {
        Sujet validated = chefEquipeService.validerSujet(chefId, sujetId);
        return ResponseEntity.ok(validated);
    }

    /**
     * GET /api/chefs-equipe/{chefId}/can-access/{candidatureId}
     * Renvoie true si le chef chefId peut accéder à la candidature candidatureId.
     */
    @GetMapping("/{chefId}/can-access/{candidatureId}")
    public ResponseEntity<Boolean> canAccess(
            @PathVariable Long chefId,
            @PathVariable Long candidatureId
    ) {
        boolean result = chefEquipeService.canAccessCandidature(chefId, candidatureId);
        return ResponseEntity.ok(result);
    }
}
