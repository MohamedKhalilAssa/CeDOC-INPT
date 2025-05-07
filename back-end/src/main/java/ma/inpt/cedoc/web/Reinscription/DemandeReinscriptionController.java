package ma.inpt.cedoc.web.Reinscription;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;
import ma.inpt.cedoc.service.Reinscription.DemandeResincriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/demandesreinscription")
@RequiredArgsConstructor
public class DemandeReinscriptionController {
    private final DemandeResincriptionService demandeResincriptionService;

    @GetMapping("/")
    public ResponseEntity<List<DemandeReinscriptionResponseDTO>> getAllDemandes() {
        return ResponseEntity.ok(demandeResincriptionService.getAllDemandes());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandeReinscriptionResponseDTO> getDemandeById(@PathVariable Long id) {
        return ResponseEntity.ok(demandeResincriptionService.getDemande(id));
    }

    @PostMapping("/")
    public ResponseEntity<DemandeReinscriptionResponseDTO> createDemande(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody DemandeReinscriptionRequestDTO demandeDTO) {
        String username = userDetails.getUsername();
        return ResponseEntity.ok(demandeResincriptionService.createDemande(demandeDTO, username));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DemandeReinscriptionResponseDTO> editDemande(@PathVariable Long id,
                                                                       @RequestBody DemandeReinscriptionRequestDTO demandeDTO) {
        return ResponseEntity.ok(demandeResincriptionService.editDemande(id, demandeDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDemande(@PathVariable Long id) {
        demandeResincriptionService.deleteDemande(id);
        return ResponseEntity.ok("Demande supprimé avec succès");
    }
}
