package ma.inpt.cedoc.web.CandidatureControllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.SujetMapper;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.service.CandidatureSevices.SujetService;

@RestController
@RequestMapping("/api/candidature")
@RequiredArgsConstructor
public class SujetController {
    private final SujetService sujetService;
    private final SujetMapper sujetMapper;

    @GetMapping("/")
    public ResponseEntity<List<SujetResponseDTO>> getAllPublicSujets() {
        return ResponseEntity.ok(
            sujetService.getAllPublicSujets().stream()
                .map(sujetMapper::toResponseDTO)
                .toList()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<SujetResponseDTO> getSujetById(@PathVariable Long id) {
        return ResponseEntity.ok(
            sujetMapper.toResponseDTO(sujetService.getSujetById(id))
        );
    }

    @PostMapping("/")
    public ResponseEntity<SujetResponseDTO> proposerSujet(
            @RequestBody SujetRequestDTO requestDTO,
            @AuthenticationPrincipal UserDetails userDetails) {

        // mapping DTO to entity
        Sujet sujet = sujetMapper.toEntity(requestDTO);

        // logique de validation est déjà dans `toEntity` via services
        Sujet saved = sujetService.saveSujet(sujet);
        return ResponseEntity.ok(sujetMapper.toResponseDTO(saved));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSujet(@PathVariable Long id) {
        Sujet sujet = sujetService.getSujetById(id);
        sujetService.deleteSujet(sujet);
        return ResponseEntity.noContent().build();
    }
}
