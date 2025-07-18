package ma.inpt.cedoc.web.Utilisateurs;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetEquipeDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.SujetEquipeMapperImpl;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;
import ma.inpt.cedoc.service.CandidatureSevices.SujetService;
import ma.inpt.cedoc.service.utilisateurServices.ChefEquipeService;
import ma.inpt.cedoc.service.utilisateurServices.UtilisateurService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chefs-equipe")
public class ChefEquipeController {

    private final ChefEquipeService chefEquipeService;
    private final SujetService sujetService;
    private final SujetEquipeMapperImpl sujetEquipeMapper;
    private final UtilisateurService utilisateurService;

    /**
     * GET /api/chefs-equipe/chefs-sujets
     * Renvoie la liste de tous les Chefs d’équipe avec leurs sujets (DTO).
     */
    @GetMapping("/chefs-sujets")
    @PreAuthorize("permitAll()")
    public ResponseEntity<List<Map<String, Object>>> getPublicSujetsAvecParticipants() {
        // 1) fetch all public sujets with eagerly loaded collections to avoid lazy
        // loading issues
        List<Sujet> sujets = sujetService.getAllPublicSujetsEntities();

        // 2) build response payload
        List<Map<String, Object>> out = sujets.stream().map(sujet -> {
            Map<String, Object> m = new HashMap<>();
            m.put("sujet", sujet);
            if (sujet.getChefEquipe() != null) {
                Long profId = sujet.getChefEquipe().getProfesseur().getId();
                m.put("chef", utilisateurService.getUtilisateurById(profId));
            } else {
                m.put("chef", null);
            }
            m.put("professeurs", sujet.getProfesseurs());
            m.put("doctorants", sujet.getDoctorants());
            return m;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(out);
    }

    /**
     * GET /api/chefs-equipe/sujets-equipes
     * Renvoie pour chaque Sujet public son intitulé et le nom de l’équipe.
     */
    @GetMapping("/sujets-equipes")
    public ResponseEntity<List<SujetEquipeDTO>> getAllSujetsAvecEquipe() {
        // directly fetch all public Sujet entities
        List<Sujet> entities = sujetService.getAllPublicSujetsEntities();

        List<SujetEquipeDTO> dtoList = entities.stream()
                .map(sujetEquipeMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }

    /**
     * 
     * 
     * 
     * 
     * * POST /api/chefs-equipe
     * 
     * rée un nouveau ChefEquipeRole (JSON correspondant à ChefEquipeRole).
     * 
     * 
     * @PostMapping
     *              @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
     *              public ResponseEntity<ChefEquipeRole> createChef(@RequestBody
     *              ChefEquipeRole chefEquipeRole) {
     *              ChefEquipeRole saved =
     *              chefEquipeService.createChefEquipe(chefEquipeRole);
     *              return ResponseEntity.status(201).body(saved);
     *              }
     * 
     *              /**
     *              GET /api/chefs-equipe
     *              Renvoie la liste brute de tous les ChefEquipeRole.
     */
    @GetMapping
    public ResponseEntity<List<ChefEquipeRole>> getAllChefs() {
        List<ChefEquipeRole> list = chefEquipeService.findAll();
        return ResponseEntity.ok(list);
    }

    /**
     * GET /api/chefs-equipe/{id}
     * Renvoie le ChefEquipeRole dont l’id vaut {id}, ou 404 s’il n’existe pas.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ChefEquipeRole> getChefById(@PathVariable Long id) {
        ChefEquipeRole chef = chefEquipeService.findById(id);
        return ResponseEntity.ok(chef);
    }

    /**
     * PUT /api/chefs-equipe/{id}
     * Met à jour le ChefEquipeRole d’identifiant {id}, avec les valeurs fournies
     * dans le JSON.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")

    public ResponseEntity<ChefEquipeRole> updateChef(
            @PathVariable Long id,
            @RequestBody ChefEquipeRole chefEquipeRole) {
        ChefEquipeRole updated = chefEquipeService.updateChefEquipe(id, chefEquipeRole);
        return ResponseEntity.ok(updated);
    }

    /**
     * DELETE /api/chefs-equipe/{id}
     * Supprime le ChefEquipeRole d’identifiant {id}. Retourne 204 si la suppression
     * réussit.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
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
     * POST /api/chefs-equipe/sujets
     * Crée un nouveau sujet directement validé par le chef d'équipe authentifié
     **/

    @PostMapping("/sujets")
    @PreAuthorize("hasAuthority('CHEF_EQUIPE')")
    public ResponseEntity<SujetResponseDTO> createSujet(@RequestBody SujetRequestDTO sujetRequest) {
        // Récupérer le chef d'équipe authentifié
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        ChefEquipeRole chefEquipe = chefEquipeService.findByEmailWithMembers(currentUserEmail);

        // Créer le sujet avec le chef d'équipe automatiquement assigné
        SujetResponseDTO createdSujet = sujetService.createSujetByChefEquipe(sujetRequest, chefEquipe.getId());

        return ResponseEntity.status(201).body(createdSujet);
    }

    @GetMapping("/{id}/candidatures")
    public ResponseEntity<List<ma.inpt.cedoc.model.entities.candidature.Candidature>> getCandidaturesByChef(
            @PathVariable Long id) {
        List<ma.inpt.cedoc.model.entities.candidature.Candidature> candidatures = chefEquipeService
                .findCandidaturesByChefEquipeId(id);
        return ResponseEntity.ok(candidatures);
    }

    /*
     * GET /api/chefs-equipe/{chefId}/can-access/{candidatureId}
     * 
     * 
     */
    @GetMapping("/{chefId}/can-access/{candidatureId}")
    public ResponseEntity<Boolean> canAccess(
            @PathVariable Long chefId,
            @PathVariable Long candidatureId) {
        boolean result = chefEquipeService.canAccessCandidature(chefId, candidatureId);
        return ResponseEntity.ok(result);
    }

    @GetMapping("/sujets/membres-equipe")
    @PreAuthorize("hasAuthority('CHEF_EQUIPE')")
    public ResponseEntity<PaginatedResponseDTO<SujetResponseDTO>> getSujetsByMembres(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size, @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(required = false) String search) {
        ChefEquipeRole chefEquipeRole = chefEquipeService.findByEmailWithMembers(SecurityContextHolder.getContext()
                .getAuthentication().getName());
        sort = sort.toLowerCase();
        if (!(sort.equals("asc") || sort.equals("desc"))) {
            sort = "asc"; // default to ascending if invalid
        }
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort), sortBy));
        PaginatedResponseDTO<SujetResponseDTO> paginatedSujets = chefEquipeService
                .findSujetsMembreEquipesPaginated(chefEquipeRole, pageable, search);
        return ResponseEntity.ok(paginatedSujets);
    }

}
