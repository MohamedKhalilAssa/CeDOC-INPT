package ma.inpt.cedoc.web.Utilisateurs;

import jakarta.validation.Valid;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.RoleAssignmentRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.service.utilisateurServices.UtilisateurService;

@RestController
@RequestMapping("/api/utilisateurs/")
@RequiredArgsConstructor
public class UtilisateurController {

    private final UtilisateurService utilisateurService;
    @GetMapping("logged-in")
    public ResponseEntity<UtilisateurResponseDTO> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    
        if (authentication != null && authentication.isAuthenticated()) {
            Object principal = authentication.getPrincipal();
    
            if (principal instanceof org.springframework.security.core.userdetails.UserDetails) {
                String email = ((org.springframework.security.core.userdetails.UserDetails) principal).getUsername();
                UtilisateurResponseDTO user = utilisateurService.getUtilisateurByEmail(email);
                return ResponseEntity.ok(user);
            }
        }
    
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/assign-role")
    public ResponseEntity<String> assignRole(@RequestBody @Valid RoleAssignmentRequestDTO request) {
        utilisateurService.assignRoleToUtilisateur(request.getEmail(), request.getRoleName());
        return ResponseEntity.ok("Rôle assigné avec succès");
    }
    @PostMapping("/set-role")
    public ResponseEntity<String> setUserRole(@RequestBody @Valid RoleAssignmentRequestDTO request) {
        utilisateurService.setSingleRoleToUtilisateur(request.getEmail(), request.getRoleName());
        return ResponseEntity.ok("Le rôle de l'utilisateur a été mis à jour avec succès.");
    }
    @GetMapping("/email/{email}")
    public ResponseEntity<UtilisateurResponseDTO> getUtilisateurByEmail(@PathVariable String email) {
        UtilisateurResponseDTO response = utilisateurService.getUtilisateurByEmail(email);
        return ResponseEntity.ok(response);
    }



}
