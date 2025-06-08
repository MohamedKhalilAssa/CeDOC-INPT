package ma.inpt.cedoc.web.Utilisateurs;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
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
}
