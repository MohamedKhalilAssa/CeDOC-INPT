package ma.inpt.cedoc.web.CandidatureControllers;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.*;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.service.CandidatureSevices.SujetService;

@RestController
@RequestMapping("/api/sujets")
@RequiredArgsConstructor
public class SujetController {

    private final SujetService sujetService;

    @GetMapping("/public")
    public ResponseEntity<List<SujetResponseDTO>> getAllPublicSujets() {
        return ResponseEntity.ok(sujetService.getAllPublicSujets());
    }

    @GetMapping("/paginated")
    public ResponseEntity<Page<SujetResponseDTO>> getAllSujetsPaginated(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(sujetService.getAllSujetsPaginated(pageable));
    }

    @GetMapping("/public/paginated")
    public ResponseEntity<Page<SujetResponseDTO>> getAllPublicSujetsPaginated(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(sujetService.getAllPublicSujetsPaginated(pageable));
    }

    @GetMapping("/simple/paginated")
    public ResponseEntity<Page<SujetResponseSimpleDTO>> getAllSimplePaginated(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(sujetService.getAllSimplePaginated(pageable));
    }

    @GetMapping("/{id}")
    public ResponseEntity<SujetResponseDTO> getSujetById(@PathVariable Long id) {
        return ResponseEntity.ok(sujetService.getSujetById(id));
    }

    @PostMapping
    public ResponseEntity<SujetResponseDTO> proposerSujet(@RequestBody SujetRequestDTO requestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {
        SujetResponseDTO saved = sujetService.proposerSujet(requestDTO);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSujet(@PathVariable Long id) {
        System.out.println(id);
        Sujet sujet = sujetService.getSujetEntityById(id);
        sujetService.deleteSujet(sujet);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<SujetResponseDTO> updateSujet(@PathVariable Long id,
            @RequestBody @Valid SujetRequestDTO requestDTO) {
        System.out.println(id);
        SujetResponseDTO updated = sujetService.updateSujet(requestDTO, id);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/{id}/simple")
    public ResponseEntity<SujetResponseSimpleDTO> getSimple(@PathVariable Long id) {
        System.out.println("simple");
        return ResponseEntity.ok(sujetService.getSimple(id));
    }

    @GetMapping("/simple")
    public ResponseEntity<List<SujetResponseSimpleDTO>> getAllSimple() {
        return ResponseEntity.ok(sujetService.getAllSimple());
    }

    /**
     * GET /api/sujets/chefs-sujets-equipes
     * Renvoie la liste paginée de tous les sujets publics avec chef et équipe avec
     * recherche.
     */
    @GetMapping("/chefs-sujets-equipes")
    @PreAuthorize("permitAll()")
    public ResponseEntity<PaginatedResponseDTO<ChefSujetsEquipeResponseDTO>> getPublicSujetsAvecChefsEtEquipesPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(required = false) String search) { // Validate sort direction
        sort = sort.toLowerCase();
        if (!(sort.equals("asc") || sort.equals("desc"))) {
            sort = "asc"; // default to ascending if invalid
        }

        // Map DTO field names to entity field names for sorting
        String entitySortBy = mapDtoFieldToEntityField(sortBy);

        // Create Pageable object
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort), entitySortBy));

        // Get paginated results with search
        PaginatedResponseDTO<ChefSujetsEquipeResponseDTO> response = sujetService
                .findPublicValideSujetsWithSearchPaginated(pageable, search);

        return ResponseEntity.ok(response);
    }

    /**
     * Maps DTO field names to entity field names for sorting
     */
    private String mapDtoFieldToEntityField(String dtoField) {
        return switch (dtoField) {
            case "intituleSujet" -> "intitule";
            case "nomCompletChef" -> "chefEquipe.professeur.utilisateur.nom";
            case "equipeIntitule" -> "chefEquipe.equipeDeRecherche.nomDeLequipe";
            default -> "id"; // Default fallback to id field
        };
    }

}
