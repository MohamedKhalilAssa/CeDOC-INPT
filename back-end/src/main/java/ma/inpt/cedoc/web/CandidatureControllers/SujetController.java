package ma.inpt.cedoc.web.CandidatureControllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseSimpleDTO;
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
        Sujet sujet = sujetService.getSujetEntityById(id);
        sujetService.deleteSujet(sujet);
        return ResponseEntity.noContent().build();
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

}
