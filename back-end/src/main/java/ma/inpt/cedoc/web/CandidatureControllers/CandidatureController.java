package ma.inpt.cedoc.web.CandidatureControllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
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
    public ResponseEntity<CandidatureResponseDTO> createCandidature(
            @ModelAttribute @Validated CandidatureRequestDTO dto,
            @AuthenticationPrincipal UserDetails userDetails) {

        CandidatureResponseDTO response = candidatureService.createCandidature(dto, userDetails);
        return ResponseEntity.ok(response);
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
}
