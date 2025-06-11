package ma.inpt.cedoc.web.Utilisateurs;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.service.utilisateurServices.EquipeService;

@RestController
@RequestMapping("/api/equipes")
@RequiredArgsConstructor
public class EquipeController {

    private final EquipeService equipeService;

    // ───–──── PUBLIC ENDPOINTS ───–────

    @GetMapping("/public")
    public ResponseEntity<List<EquipeResponseDTO>> getAllPublicEquipes() {
        return ResponseEntity.ok(equipeService.getAllEquipes());
    }

    @GetMapping("/public/simple")
    public ResponseEntity<List<EquipeSimpleDTO>> getAllSimpleEquipes() {
        return ResponseEntity.ok(equipeService.getAllSimple());
    }

    /**
     * GET /api/equipes/public/search
     * Recherche paginée d'équipes avec tri et filtrage.
     */
    @GetMapping("/public/paginated")
    public ResponseEntity<PaginatedResponseDTO<EquipeResponseDTO>> searchEquipesPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(required = false) String search) {

        // Validate sort direction
        sort = sort.toLowerCase();
        if (!(sort.equals("asc") || sort.equals("desc"))) {
            sort = "asc"; // default to ascending if invalid
        }

        // Map DTO field names to entity field names for sorting
        String entitySortBy = mapDtoFieldToEntityField(sortBy);

        // Create Pageable object
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort), entitySortBy));

        // Get paginated results with search
        PaginatedResponseDTO<EquipeResponseDTO> response = equipeService.findEquipesWithSearchPaginated(pageable,
                search);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/public/{id}")
    public ResponseEntity<EquipeResponseDTO> getEquipeById(@PathVariable Long id) {
        return ResponseEntity.ok(equipeService.getEquipeById(id));
    }

    // ───–──── ADMIN ENDPOINTS ───–────

    @PostMapping
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<EquipeResponseDTO> createEquipe(@RequestBody @Valid EquipeRequestDTO requestDTO) {
        EquipeResponseDTO saved = equipeService.saveEquipe(requestDTO);
        return ResponseEntity.status(201).body(saved);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<EquipeResponseDTO> updateEquipe(@PathVariable Long id,
            @RequestBody @Valid EquipeRequestDTO requestDTO) {
        EquipeResponseDTO updated = equipeService.updateEquipe(requestDTO, id);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<Void> deleteEquipe(@PathVariable Long id) {
        equipeService.deleteEquipeById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<List<EquipeResponseDTO>> getAllEquipes() {
        return ResponseEntity.ok(equipeService.getAllEquipes());
    }

    @GetMapping("/paginated")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<Page<EquipeResponseDTO>> getAllEquipesPaginatedAdmin(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        return ResponseEntity.ok(equipeService.getAllEquipesPaginated(pageable));
    }

    /**
     * GET /api/equipes/admin/paginated
     * Admin version of paginated search with full search and sort capabilities
     */
    @GetMapping("/admin/paginated")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<PaginatedResponseDTO<EquipeResponseDTO>> searchEquipesPaginatedAdmin(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(required = false) String search) {

        // Validate sort direction
        sort = sort.toLowerCase();
        if (!(sort.equals("asc") || sort.equals("desc"))) {
            sort = "asc"; // default to ascending if invalid
        }

        // Map DTO field names to entity field names for sorting
        String entitySortBy = mapDtoFieldToEntityField(sortBy);

        // Create Pageable object
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort), entitySortBy));

        // Get paginated results with search
        PaginatedResponseDTO<EquipeResponseDTO> response = equipeService.findEquipesWithSearchPaginated(pageable,
                search);

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<EquipeResponseDTO> getEquipeByIdAdmin(@PathVariable Long id) {
        return ResponseEntity.ok(equipeService.getEquipeById(id));
    }

    @GetMapping("/chef/{chefId}")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<List<EquipeResponseDTO>> getEquipesByChef(@PathVariable Long chefId) {
        return ResponseEntity.ok(equipeService.getEquipesByChefEquipeId(chefId));
    }

    @GetMapping("/search")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<List<EquipeResponseDTO>> searchEquipesByName(@RequestParam String name) {
        return ResponseEntity.ok(equipeService.searchEquipesByName(name));
    }

    // ───–──── ENTITY ENDPOINTS (for internal use) ───–────

    @GetMapping("/entities")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<List<EquipeDeRecherche>> getAllEquipesEntities() {
        return ResponseEntity.ok(equipeService.getAllEquipesEntities());
    }

    @GetMapping("/entities/{id}")
    @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<EquipeDeRecherche> getEquipeEntityById(@PathVariable Long id) {
        return ResponseEntity.ok(equipeService.getEquipeEntityById(id));
    }

    /**
     * Maps DTO field names to entity field names for sorting
     */
    private String mapDtoFieldToEntityField(String dtoField) {
        return switch (dtoField) {
            case "nomDeLequipe" -> "nomDeLequipe";
            case "nomCompletChef" -> "chefEquipe.professeur.utilisateur.nom";
            case "nombreMembres" -> "membres.size";
            case "nombreDoctorants" -> "doctorants.size";
            case "createdAt" -> "createdAt";
            case "updatedAt" -> "updatedAt";
            default -> "id"; // Default fallback to id field
        };
    }
}