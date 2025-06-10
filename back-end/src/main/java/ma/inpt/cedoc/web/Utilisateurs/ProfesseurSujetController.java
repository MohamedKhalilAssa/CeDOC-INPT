package ma.inpt.cedoc.web.Utilisateurs;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.service.CandidatureSevices.SujetService;

@RestController
@RequestMapping("/api/professeurs")
@RequiredArgsConstructor
public class ProfesseurSujetController {

    private final SujetService sujetService;

    /**
     * GET /api/professeurs/mes-sujets
     * Récupère tous les sujets proposés par l'utilisateur connecté avec pagination
     * et recherche
     */
    @GetMapping("/mes-sujets")
    @PreAuthorize("hasAnyAuthority('PROFESSEUR', 'DIRECTEUR_DE_THESE', 'CHEF_EQUIPE', 'DIRECTION_CEDOC')")
    public ResponseEntity<PaginatedResponseDTO<SujetResponseDTO>> getMesSujets(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(defaultValue = "asc") String sort,
            @RequestParam(required = false) String search) {

        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        // Validate and normalize sort direction
        sort = sort.toLowerCase();
        if (!(sort.equals("asc") || sort.equals("desc"))) {
            sort = "asc"; // default to ascending if invalid
        }

        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(sort), sortBy));
        PaginatedResponseDTO<SujetResponseDTO> paginatedSujets = sujetService
                .getMesSujetsPaginated(currentUserEmail, pageable, search);

        return ResponseEntity.ok(paginatedSujets);
    }

    /**
     * GET /api/professeurs/can-modify-sujet/{sujetId}
     * Vérifie si l'utilisateur actuel peut modifier ou supprimer un sujet
     */
    @GetMapping("/can-modify-sujet/{sujetId}")
    @PreAuthorize("hasAnyAuthority('PROFESSEUR', 'DIRECTEUR_DE_THESE', 'CHEF_EQUIPE', 'DIRECTION_CEDOC')")
    public ResponseEntity<Boolean> canModifySujet(@PathVariable Long sujetId) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        boolean canModify = sujetService.canModifyOrDeleteSujet(sujetId, currentUserEmail);
        return ResponseEntity.ok(canModify);
    }
}
