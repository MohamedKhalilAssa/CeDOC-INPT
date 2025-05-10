package ma.inpt.cedoc.web.DoctorantActionControllers;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.service.DoctorantActionService.ConfParticipationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/confparticipation")
@RequiredArgsConstructor
public class ConfParticipationController {
    private final ConfParticipationService confParticipationService;

    @GetMapping("/")
    public ResponseEntity<List<ConfParticipationResponseDTO>> getAllConfParticipations() {
        return ResponseEntity.ok(confParticipationService.getAllConfParticipations());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConfParticipationResponseDTO> getConfParticipationById(@PathVariable Long id) {
        return ResponseEntity.ok(confParticipationService.getConfParticipationBy(id));
    }

    @PostMapping("/")
    public ResponseEntity<ConfParticipationResponseDTO> createConfParticipation(@AuthenticationPrincipal UserDetails userDetails,
                                                                                @RequestBody ConfParticipationRequestDTO confParticipationRequestDTO) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(confParticipationService.addConfParticipation(confParticipationRequestDTO, email));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConfParticipationResponseDTO> editConfParticipation(@AuthenticationPrincipal UserDetails userDetails,
                                                                              @PathVariable Long id,
                                                                              @RequestBody ConfParticipationRequestDTO requestDTO) {
        String email = userDetails.getUsername();
        return ResponseEntity.ok(confParticipationService.updateConfParticipation(requestDTO, id, email));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteConfParticipation(@AuthenticationPrincipal UserDetails userDetails,
                                                                                @PathVariable Long id) {
        String email = userDetails.getUsername();
        confParticipationService.deleteConfParticipation(id, email);
        return ResponseEntity.ok("La participation à la conférence est supprimé avec succès");
    }

    @PatchMapping("/{id}/valider")
    public ResponseEntity<ConfParticipationResponseDTO> validerConfParticipation(@AuthenticationPrincipal UserDetails userDetails,
                                                                                 @PathVariable Long id){
        String email = userDetails.getUsername();
        return ResponseEntity.ok(confParticipationService.validerConfParticipation(id, email));
    }

    @PatchMapping("/{id}/refuser")
    public ResponseEntity<ConfParticipationResponseDTO> refuserConfParticipation(@AuthenticationPrincipal UserDetails userDetails,
                                                                                 @PathVariable Long id){
        String email = userDetails.getUsername();
        return ResponseEntity.ok(confParticipationService.refuserConfParticipation(id, email));
    }
}
