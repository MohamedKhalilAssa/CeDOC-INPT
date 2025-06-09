package ma.inpt.cedoc.web.CandidatureControllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Generic.ErrorResponse;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
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

        @GetMapping("/accessible")
        public ResponseEntity<List<Candidature>> getAccessibleCandidatures(@AuthenticationPrincipal UserDetails userDetails) {
            List<Candidature> list = candidatureService.getAccessibleCandidatures(userDetails);
            return ResponseEntity.ok(list);
        }
    
}
