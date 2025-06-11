package ma.inpt.cedoc.web.CandidatureControllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.*;
import org.springframework.security.access.AccessDeniedException;
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
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.candidatureRepositories.CandidatureRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;
import ma.inpt.cedoc.service.CandidatureSevices.CandidatureService;

// @ModelAttribute -> Spring remplit automatiquement les DTOs à partir du formulaire frontend.

@RestController
@RequestMapping("/api/candidatures")
@RequiredArgsConstructor
@Validated
public class CandidatureController {

    private final CandidatureService candidatureService;
    private final CandidatureRepository candidatureRepository;
    private final UtilisateurRepository utilisateurRepository;

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

        // 12) Download candidature dossier
        @GetMapping("/{id}/dossier/download")
        public ResponseEntity<Resource> downloadCandidatureDossier(
            @PathVariable("id") Long candidatureId,
            @AuthenticationPrincipal UserDetails userDetails
        ) {
            try {
                // 1. Load candidature
                Candidature candidature = candidatureRepository.findById(candidatureId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable"));

                // 2. Check authorization - user should have access to view this candidature
                Utilisateur currentUser = utilisateurRepository.findByEmail(userDetails.getUsername())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

                // Check if user is the candidat owner or has administrative access
                boolean isOwner = candidature.getCandidat().getUtilisateur().getId().equals(currentUser.getId());
                boolean hasAdminAccess = currentUser.hasRole(ma.inpt.cedoc.model.enums.utilisateur_enums.RoleEnum.DIRECTION_CEDOC) ||
                                       currentUser.hasRole(ma.inpt.cedoc.model.enums.utilisateur_enums.RoleEnum.CHEF_EQUIPE) ||
                                       currentUser.hasRole(ma.inpt.cedoc.model.enums.utilisateur_enums.RoleEnum.PROFESSEUR) ||
                                       currentUser.hasRole(ma.inpt.cedoc.model.enums.utilisateur_enums.RoleEnum.DIRECTEUR_DE_THESE);
                
                if (!isOwner && !hasAdminAccess) {
                    throw new AccessDeniedException("Vous n'avez pas l'autorisation de télécharger ce dossier");
                }

                // 3. Check if file exists
                String dossierPath = candidature.getDossierCandidature();
                if (dossierPath == null || dossierPath.isBlank()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Aucun dossier de candidature disponible");
                }

                // 4. Load file
                Path filePath = Paths.get(dossierPath);
                if (!Files.exists(filePath)) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Le fichier dossier n'existe plus sur le serveur");
                }

                Resource resource = new UrlResource(filePath.toUri());
                if (!resource.exists() || !resource.isReadable()) {
                    throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Fichier non accessible");
                }

                // 5. Determine content type
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream"; // Default binary content type
                }

                // 6. Generate filename for download
                String filename = String.format("dossier_candidature_%s_%s_%d.zip", 
                    candidature.getCandidat().getUtilisateur().getPrenom(),
                    candidature.getCandidat().getUtilisateur().getNom(),
                    candidatureId);

                return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + filename + "\"")
                    .body(resource);

            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, 
                    "Erreur lors de la lecture du fichier", e);
            }
        }

    
}
