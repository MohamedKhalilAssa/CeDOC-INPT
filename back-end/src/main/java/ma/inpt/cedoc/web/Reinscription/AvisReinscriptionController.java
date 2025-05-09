package ma.inpt.cedoc.web.Reinscription;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.AvisReinscriptionResponseDTO;
import ma.inpt.cedoc.service.Reinscription.AvisReinscriptionService;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<AvisReinscriptionResponseDTO>> getAll(){
        return ResponseEntity.ok(avisReinscriptionService.getAllAvis());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AvisReinscriptionResponseDTO> getById(@PathVariable Long id){
        return ResponseEntity.ok(avisReinscriptionService.getAvis(id));
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
