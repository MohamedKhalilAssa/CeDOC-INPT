package ma.inpt.cedoc.web.DoctorantActionControllers;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.PublicationResponseDTO;
import ma.inpt.cedoc.service.DoctorantActionService.PublicationService;

@RestController
@RequestMapping("/api/publications")
@RequiredArgsConstructor
public class PublicationController {
    private final PublicationService publicationService;

    @GetMapping("/")
    public Page<PublicationResponseDTO> getAllPublications(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        Pageable pageable = PageRequest.of(page, size);
        return publicationService.getAllPublications(pageable);
    }

    @GetMapping("/doctorant/{id}")
    public Page<PublicationResponseDTO> getPublicationsByDoctorantId(
            @PathVariable Long id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return publicationService.getPublicationsByDoctorantId(id, pageable);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PublicationResponseDTO> getPublicationById(@PathVariable Long id) {
        return ResponseEntity.ok(publicationService.getPublicationById(id));
    }

//    @Secured("DOCTORANT")
    @PostMapping("/")
    public ResponseEntity<PublicationResponseDTO> createPublication(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PublicationRequestDTO request) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(publicationService.addPublication(request, email));
    }

//    @Secured("DOCTORANT")
    @PutMapping("/{id}")
    public ResponseEntity<PublicationResponseDTO> updatePublication(@AuthenticationPrincipal UserDetails userDetails,
            @RequestBody PublicationRequestDTO request,
            @PathVariable Long id) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(publicationService.updatePublication(request, id, email));
    }

//    @Secured("DOCTORANT")
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePublication(@AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        String email = userDetails.getUsername();
        publicationService.deletePublication(id, email);
        return ResponseEntity.ok("Publication " + id + " est supprimé avec succès");
    }

//    @Secured("DIRECTION_CEDOC")
    @PatchMapping("/{id}/valider")
    public ResponseEntity<PublicationResponseDTO> validerPublication(@AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(publicationService.validerPublication(id, email));
    }

//    @Secured("DIRECTION_CEDOC")
    @PatchMapping("/{id}/refuser")
    public ResponseEntity<PublicationResponseDTO> refuserPublication(@AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long id) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(publicationService.refuserPublication(id, email));
    }
}
