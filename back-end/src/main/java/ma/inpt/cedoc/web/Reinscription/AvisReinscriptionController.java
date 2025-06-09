package ma.inpt.cedoc.web.Reinscription;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionResponseDTO;
import ma.inpt.cedoc.service.Reinscription.AvisReinscriptionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/avisreinscription")
@RequiredArgsConstructor
public class AvisReinscriptionController {
    private final AvisReinscriptionService avisReinscriptionService;

    @GetMapping("/")
    public Page<AvisReinscriptionResponseDTO> getAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDir
    ){
        Sort sort = Sort.by("updatedAt").ascending();
        if (sortDir.equalsIgnoreCase("desc")) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        return avisReinscriptionService.getAllAvis(pageable);
    }

    @GetMapping("/directeurthese/{id}")
    public Page<AvisReinscriptionResponseDTO> getAvisByDirecteurTheseId(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDir
    ){
        Sort sort = Sort.by("updatedAt").ascending();
        if (sortDir.equalsIgnoreCase("desc")) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        return avisReinscriptionService.getAvisByDirecteurThese(id, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvisReinscriptionResponseDTO> getAvisById(@PathVariable Long id){
        return ResponseEntity.ok(avisReinscriptionService.getAvisById(id));
    }

    @PostMapping("/")
    public ResponseEntity<AvisReinscriptionResponseDTO> createAvis(@AuthenticationPrincipal UserDetails userDetails,
                                                                   @RequestBody AvisReinscriptionRequestDTO requestDTO){
        String email = userDetails.getUsername();
        return ResponseEntity.ok(avisReinscriptionService.createAvis(requestDTO, email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AvisReinscriptionResponseDTO> editAvis(@AuthenticationPrincipal UserDetails userDetails,
                                                                 @RequestBody AvisReinscriptionRequestDTO requestDTO,
                                                                 @PathVariable Long id){
        String email = userDetails.getUsername();
        return ResponseEntity.ok(avisReinscriptionService.editAvis(requestDTO, id, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAvis(@AuthenticationPrincipal UserDetails userDetails,
                                             @PathVariable Long id){
        String email = userDetails.getUsername();
        avisReinscriptionService.deleteAvis(id, email);
        return ResponseEntity.ok("L'avis de réinscription a été supprimé avec succès");
    }
}
