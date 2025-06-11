package ma.inpt.cedoc.web.Utilisateurs;

import java.util.List;

import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.DoctorantResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.Global.PaginatedMapper;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.DoctorantMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.service.utilisateurServices.DoctorantService;

@RestController
@RequestMapping("/api/doctorants")
@RequiredArgsConstructor
public class DoctorantController {

    private final DoctorantService doctorantService;
    private final DoctorantMapper doctorantMapper;

    // ───────── PUBLIC ENDPOINTS ─────────

    /**
     * GET /api/doctorants
     * Récupère la liste de tous les doctorants
     */
    @GetMapping
    public ResponseEntity<List<DoctorantResponseDTO>> getAllDoctorants() {
        List<Doctorant> doctorants = doctorantService.getAllDoctorants();
        List<DoctorantResponseDTO> doctorantsDto = doctorantMapper.toDtoList(doctorants);
        return ResponseEntity.ok(doctorantsDto);
    }

    /**
     * GET /api/doctorants/{id}
     * Récupère un doctorant par son ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<DoctorantResponseDTO> getDoctorantById(@PathVariable Long id) {
        Doctorant doctorant = doctorantService.getDoctorantById(id);
        DoctorantResponseDTO doctorantDto = doctorantMapper.toDto(doctorant);
        return ResponseEntity.ok(doctorantDto);
    }

    /**
     * GET /api/doctorants/search
     * Recherche des doctorants par nom, prénom ou email
     */
    @GetMapping("/search")
    public ResponseEntity<List<DoctorantResponseDTO>> searchDoctorants(
            @RequestParam String query) {
        List<Doctorant> doctorants = doctorantService.searchForDoctorants(query);
        List<DoctorantResponseDTO> doctorantsDto = doctorantMapper.toDtoList(doctorants);
        return ResponseEntity.ok(doctorantsDto);
    }

    /**
     * GET /api/doctorants/paginated
     * Récupère tous les doctorants avec pagination
     */
    @GetMapping("/paginated")
    public ResponseEntity<Page<DoctorantResponseDTO>> getAllDoctorantsPaginated(
            @PageableDefault(size = 10, sort = "id") Pageable pageable) {
        Page<Doctorant> doctorantsPage = doctorantService.getAllDoctorants(pageable);
        Page<DoctorantResponseDTO> doctorantsDto = doctorantsPage.map(doctorantMapper::toDto);
        return ResponseEntity.ok(doctorantsDto);
    }

    /**
     * GET /api/doctorants/search/paginated
     * Recherche paginée de doctorants avec tri et filtrage
     */
    @GetMapping("/search/paginated")
    public ResponseEntity<PaginatedResponseDTO<DoctorantResponseDTO>> searchDoctorantsPaginated(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(required = false) String search) {

        // Validate and normalize sort direction
        String normalizedSort = sort.toLowerCase();
        if (!normalizedSort.equals("asc") && !normalizedSort.equals("desc")) {
            normalizedSort = "asc";
        }

        // Create Sort object
        Sort.Direction direction = normalizedSort.equals("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        Sort sortObj = Sort.by(direction, sortBy);

        // Create Pageable
        Pageable pageable = PageRequest.of(page, size, sortObj);

        // Get doctorants based on search parameter
        Page<Doctorant> doctorantsPage;
        if (search != null && !search.trim().isEmpty()) {
            // For search, we need to get all results first, then paginate manually
            // This is a limitation when using repository search methods
            List<Doctorant> searchResults = doctorantService.searchForDoctorants(search.trim());
            
            // Manual pagination for search results
            int start = (int) pageable.getOffset();
            int end = Math.min((start + pageable.getPageSize()), searchResults.size());
            
            List<Doctorant> pageContent = searchResults.subList(start, end);
            doctorantsPage = new org.springframework.data.domain.PageImpl<>(
                pageContent, pageable, searchResults.size());
        } else {
            doctorantsPage = doctorantService.getAllDoctorants(pageable);
        }

        // Convert to DTOs
        List<DoctorantResponseDTO> doctorantsDto = doctorantsPage.getContent()
                .stream()
                .map(doctorantMapper::toDto)
                .toList();

        // Create response using PaginatedMapper
        PaginatedResponseDTO<DoctorantResponseDTO> response = PaginatedMapper.mapToDTO(
                doctorantsDto,
                doctorantsPage.getNumber(),
                doctorantsPage.getTotalPages(),
                doctorantsPage.getTotalElements(),
                doctorantsPage.getSize(),
                doctorantsPage.isLast());

        return ResponseEntity.ok(response);
    }

    // ───────── ADMIN ENDPOINTS ─────────

    /**
     * POST /api/doctorants
     * Crée un nouveau doctorant
     * TODO: Add appropriate role-based security
     */
    @PostMapping
    // @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<DoctorantResponseDTO> createDoctorant(
            @RequestBody @Valid Doctorant doctorant) {
        Doctorant savedDoctorant = doctorantService.createDoctorant(doctorant);
        DoctorantResponseDTO doctorantDto = doctorantMapper.toDto(savedDoctorant);
        return new ResponseEntity<>(doctorantDto, HttpStatus.CREATED);
    }

    /**
     * PUT /api/doctorants/{id}
     * Met à jour un doctorant existant
     * TODO: Add appropriate role-based security
     */
    @PutMapping("/{id}")
    // @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<DoctorantResponseDTO> updateDoctorant(
            @PathVariable Long id,
            @RequestBody @Valid Doctorant doctorant) {
        Doctorant updatedDoctorant = doctorantService.updateDoctorant(id, doctorant);
        DoctorantResponseDTO doctorantDto = doctorantMapper.toDto(updatedDoctorant);
        return ResponseEntity.ok(doctorantDto);
    }

    /**
     * DELETE /api/doctorants/{id}
     * Supprime un doctorant
     * TODO: Add appropriate role-based security
     */
    @DeleteMapping("/{id}")
    // @PreAuthorize("hasAuthority('DIRECTION_CEDOC')")
    public ResponseEntity<Void> deleteDoctorant(@PathVariable Long id) {
        doctorantService.deleteDoctorant(id);
        return ResponseEntity.noContent().build();
    }
}
