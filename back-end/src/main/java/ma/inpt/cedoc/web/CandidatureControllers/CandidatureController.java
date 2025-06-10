package ma.inpt.cedoc.web.CandidatureControllers;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.*;
import ma.inpt.cedoc.model.DTOs.Generic.ErrorResponse;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.service.CandidatureSevices.CandidatureService;

// @ModelAttribute -> Spring remplit automatiquement les DTOs à partir du formulaire frontend.

@RestController
@RequestMapping("/api/candidatures")
@RequiredArgsConstructor
@Validated
public class CandidatureController {

    private final CandidatureService candidatureService;

    // 1) Création d’une nouvelle candidature (multipart/form-data pour inclure le champ MultipartFile)
    @PostMapping("/postuler")
    public ResponseEntity<ErrorResponse> createCandidature(
            @ModelAttribute @Validated CandidatureRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {

        CandidatureResponseDTO response = candidatureService.createCandidature(dto, userDetails);
        if(response == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "La candidature n'a pas pu être créée. Veuillez vérifier les données soumises.");
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(ErrorResponse.builder()
                .message("Candidature créée avec succès")
                .statusCode(HttpStatus.CREATED.value())
                .build());
    }

    // 2) Modification d’une candidature existante avant la date limite
    @PutMapping("/{id}")
    public ResponseEntity<CandidatureResponseDTO> updateCandidature(
            @PathVariable("id") Long id,
            @ModelAttribute @Validated CandidatureRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {

        CandidatureResponseDTO response = candidatureService.updateCandidature(id, dto, userDetails);
        return ResponseEntity.ok(response);
    }

    // 3) Consultation / Suivi du statut de la candidature par le candidat
    @GetMapping("/me")
    public ResponseEntity<List<CandidatureResponseDTO>> getMyCandidatures(
            @AuthenticationPrincipal UserDetails userDetails) {

        List<CandidatureResponseDTO> list = candidatureService.getMyCandidatures(userDetails);
        return ResponseEntity.ok(list);
    }

    // 4) Consultation publique : lister toutes les équipes
    @GetMapping("/equipes")
    public ResponseEntity<List<EquipeSimpleDTO>> getAllEquipes() {
        List<EquipeSimpleDTO> equipes = candidatureService.getAllEquipes();
        return ResponseEntity.ok(equipes);
    }

    // 5) Consultation publique : lister les professeurs d’une équipe
    @GetMapping("/equipes/{equipeId}/professeurs")
    public ResponseEntity<List<ProfesseurResponseDTO>> getProfesseursByEquipe(
            @PathVariable Long equipeId) {

        List<ProfesseurResponseDTO> profs = candidatureService.getProfesseursByEquipeId(equipeId);
        return ResponseEntity.ok(profs);
    }

    // 6) Consultation publique : lister les sujets d’une équipe
    @GetMapping("/equipes/{equipeId}/sujets")
    public ResponseEntity<List<SujetResponseDTO>> getSujetsByEquipe(
            @PathVariable Long equipeId) {

        List<SujetResponseDTO> sujets = candidatureService.getSujetsByEquipeId(equipeId);
        return ResponseEntity.ok(sujets);
    }

        // 7) READ (par ID) – pour un candidat ou un admin
        @GetMapping("/{id}")
        public ResponseEntity<CandidatureResponseDTO> getCandidatureById(
                @PathVariable Long id,
                @AuthenticationPrincipal UserDetails userDetails) {
    
            CandidatureResponseDTO dto = candidatureService.getCandidatureById(id, userDetails);
            return ResponseEntity.ok(dto);
        }
    
        // 8) DELETE – supprimer une candidature (p.ex. si le candidat annule avant la date limite)
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteCandidature(
                @PathVariable Long id,
                @AuthenticationPrincipal UserDetails userDetails) {
    
            candidatureService.deleteCandidature(id, userDetails);
            return ResponseEntity.noContent().build();
        }

        

        // 9) Chef d’équipe : accepter une candidature
        @PostMapping("/{id}/accepter")
        public ResponseEntity<CandidatureResponseDTO> accepterCandidature(
            @PathVariable("id") Long candidatureId,
            @RequestBody AccepterCandidatureRequest dto,
            @AuthenticationPrincipal UserDetails userDetails
        ) {
            // délégué à votre service
            CandidatureResponseDTO saved = 
                candidatureService.accepterCandidature(candidatureId, dto.getDateEntretien());
            return ResponseEntity.ok(saved);
        }

        // 10) Chef d’équipe : refuser une candidature
        @PostMapping("/{id}/refuser")
        public ResponseEntity<CandidatureResponseDTO> refuserCandidature(
            @PathVariable("id") Long candidatureId,
            @RequestBody RefuserCandidatureRequest dto,
            @AuthenticationPrincipal UserDetails userDetails
        ) {
            CandidatureResponseDTO saved =
                candidatureService.refuserCandidature(candidatureId, dto.getMotif());
            return ResponseEntity.ok(saved);
        }

        @GetMapping("/accessible")
        public ResponseEntity<PaginatedResponseDTO<CandidatureResponseDTO>> getAccessibleCandidatures(
                @AuthenticationPrincipal UserDetails userDetails,
                @RequestParam(defaultValue = "0")   int page,
                @RequestParam(defaultValue = "10")  int size,
                @RequestParam(defaultValue = "id")  String sortBy,
                @RequestParam(defaultValue = "asc") String sort,
                @RequestParam(required = false) String search
        ) { 
            System.out.println("HEY");
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
            PaginatedResponseDTO<CandidatureResponseDTO> response = candidatureService
                    .getAccessibleCandidatures(userDetails, pageable, search);

            return ResponseEntity.ok(response);
        }

        /**
         * Maps DTO field names to entity field names for sorting
         */
        private String mapDtoFieldToEntityField(String dtoField) {
            return switch (dtoField) {
                case "candidatNom" -> "candidatNom";
                case "candidatPrenom" -> "candidatPrenom";
                case "candidatEmail" -> "candidatEmail";
                case "statutCandidature" -> "statutCandidature";
                case "specialite" -> "specialite";
                case "createdAt" -> "createdAt";
                case "updatedAt" -> "updatedAt";
                default -> "id"; // Default fallback to id field
            };
        }

        // 11) Change candidature status (PROFESSEUR, CHEF_EQUIPE, DIRECTEUR_DE_THESE, DIRECTION_CEDOC only)
        @PutMapping("/{id}/status")
        public ResponseEntity<CandidatureResponseDTO> changeStatutCandidature(
            @PathVariable("id") Long candidatureId,
            @RequestBody @Validated ChangeStatutCandidatureRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails
        ) {
            CandidatureResponseDTO updated = candidatureService.changeStatutCandidature(candidatureId, dto, userDetails);
            return ResponseEntity.ok(updated);
        }

    
}
