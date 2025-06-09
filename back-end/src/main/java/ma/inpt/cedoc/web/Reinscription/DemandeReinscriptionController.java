package ma.inpt.cedoc.web.Reinscription;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionRequestDTO;
import ma.inpt.cedoc.model.DTOs.Reinscription.DemandeReinscriptionResponseDTO;
import ma.inpt.cedoc.service.Reinscription.DemandeResincriptionService;
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
@RequestMapping("/api/demandesreinscription")
@RequiredArgsConstructor
public class DemandeReinscriptionController {
    private final DemandeResincriptionService demandeResincriptionService;

    @GetMapping("/")
    public Page<DemandeReinscriptionResponseDTO> getAllDemandes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Sort sort = Sort.by("updatedAt").ascending();
        if (sortDir.equalsIgnoreCase("desc")) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        return demandeResincriptionService.getAllDemandes(pageable);
    }

    @GetMapping("doctorant/{id}")
    public Page<DemandeReinscriptionResponseDTO> getDemandesByDoctorantId(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Sort sort = Sort.by("updatedAt").ascending();
        if (sortDir.equalsIgnoreCase("desc")) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        return demandeResincriptionService.getDemandesByDoctorantId(id, pageable);
    }

    // avoir les demandes de réinscription aux quelle ce directeur de thèse est responsable de réviser
    @GetMapping("directeurthese/{id}")
    public Page<DemandeReinscriptionResponseDTO> getDemandesByDirecteurTheseId(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Sort sort = Sort.by("updatedAt").ascending();
        if (sortDir.equalsIgnoreCase("desc")) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        return demandeResincriptionService.getDemandesByDirecteurTheseId(id, pageable);
    }

    // avoir les demandes de réinscription aux quelle ce chef d'équpie est responsable de réviser
    @GetMapping("chefequipe/{id}")
    public Page<DemandeReinscriptionResponseDTO> getDemandesByChefEquipeId(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "desc") String sortDir
    ) {
        Sort sort = Sort.by("updatedAt").ascending();
        if (sortDir.equalsIgnoreCase("desc")) {
            sort = sort.descending();
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        return demandeResincriptionService.getDemandesByChefEquipeId(id, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DemandeReinscriptionResponseDTO> getDemandeById(@PathVariable Long id) {
        return ResponseEntity.ok(demandeResincriptionService.getDemandeById(id));
    }

    @PostMapping("/")
    public ResponseEntity<DemandeReinscriptionResponseDTO> createDemande(@AuthenticationPrincipal UserDetails userDetails,
                                                                         @RequestBody DemandeReinscriptionRequestDTO demandeDTO) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(demandeResincriptionService.createDemande(demandeDTO, email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<DemandeReinscriptionResponseDTO> editDemande(@AuthenticationPrincipal UserDetails userDetails,
                                                                       @PathVariable Long id,
                                                                       @RequestBody DemandeReinscriptionRequestDTO demandeDTO) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(demandeResincriptionService.editDemande(id, demandeDTO, email));
    }

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
