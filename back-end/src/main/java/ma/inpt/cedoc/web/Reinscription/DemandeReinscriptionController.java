package ma.inpt.cedoc.web.Reinscription;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;
import ma.inpt.cedoc.service.Reinscription.DemandeResincriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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

    @GetMapping("doctorant/{id}")
    public ResponseEntity<List<DemandeReinscriptionResponseDTO>> getDemandesByDoctorantId(@PathVariable Long id) {
        return ResponseEntity.ok(demandeResincriptionService.getDemandesByDoctorantId(id));
    }

    // avoir les demandes de réinscription aux quelle ce directeur de thèse est responsable de réviser
    @GetMapping("directeurthese/{id}")
    public ResponseEntity<List<DemandeReinscriptionResponseDTO>> getDemandesByDirecteurTheseId(@PathVariable Long id) {
        return ResponseEntity.ok(demandeResincriptionService.getDemandesByDirecteurTheseId(id));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandeReinscriptionResponseDTO> getDemandeById(@PathVariable Long id) {
        return ResponseEntity.ok(demandeResincriptionService.getDemandeById(id));
    }

    @Secured("DOCTORANT")
    @PostMapping("/")
    public ResponseEntity<DemandeReinscriptionResponseDTO> createDemande(@AuthenticationPrincipal UserDetails userDetails,
                                                                         @RequestBody DemandeReinscriptionRequestDTO demandeDTO) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(demandeResincriptionService.createDemande(demandeDTO, email));
    }

    @Secured("DOCTORANT")
    @PutMapping("/{id}")
    public ResponseEntity<DemandeReinscriptionResponseDTO> editDemande(@AuthenticationPrincipal UserDetails userDetails,
                                                                       @PathVariable Long id,
                                                                       @RequestBody DemandeReinscriptionRequestDTO demandeDTO) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(demandeResincriptionService.editDemande(id, demandeDTO, email));
    }

    @Secured("DOCTORANT")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDemande(@AuthenticationPrincipal UserDetails userDetails,
                                                @PathVariable Long id) {
        String email = userDetails.getUsername();
        demandeResincriptionService.deleteDemande(id, email);
        return ResponseEntity.ok("Demande supprimé avec succès");
    }

    @PatchMapping("/{id}/validerchef")
    public ResponseEntity<DemandeReinscriptionResponseDTO> validerDemandeParChefEquipe(@AuthenticationPrincipal UserDetails userDetails,
                                                      @PathVariable Long id){
        String email = userDetails.getUsername();
        return ResponseEntity.ok(demandeResincriptionService.validerchef(id, email));
    }

    @PatchMapping("/{id}/refuserchef")
    public ResponseEntity<DemandeReinscriptionResponseDTO> refuserDemandeParChefEquipe(@AuthenticationPrincipal UserDetails userDetails,
                                                      @PathVariable Long id){
        String email = userDetails.getUsername();
        return ResponseEntity.ok(demandeResincriptionService.refuserchef(id, email));
    }

    @PatchMapping("/{id}/validerdirection")
    public ResponseEntity<DemandeReinscriptionResponseDTO> validerDemandeParDirection(@AuthenticationPrincipal UserDetails userDetails,
                                                      @PathVariable Long id){
        String email = userDetails.getUsername();
        return ResponseEntity.ok(demandeResincriptionService.validerdirection(id, email));
    }

    @PatchMapping("/{id}/refuserdirection")
    public ResponseEntity<DemandeReinscriptionResponseDTO> refuserDemandeParDirection(@AuthenticationPrincipal UserDetails userDetails,
                                                      @PathVariable Long id){
        String email = userDetails.getUsername();

        return ResponseEntity.ok(demandeResincriptionService.refuserdirection(id, email));
    }


}
