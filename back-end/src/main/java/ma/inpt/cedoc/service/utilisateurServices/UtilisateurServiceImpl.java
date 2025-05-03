package ma.inpt.cedoc.service.utilisateurServices;

import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Role;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.utilisateursRepositories.RoleRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;

@Service
@RequiredArgsConstructor
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository roleRepository;

    @Transactional
    public void assignRoleToUtilisateur(String email, String roleName) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).orElse(null);
        Role role = roleRepository.findByIntitule(roleName).orElse(null);

        if (utilisateur != null && role != null) {
            utilisateur.getRoles().add(role); // 🔥 Just add to the existing set
            utilisateurRepository.save(utilisateur);
            System.out.println("Role " + roleName + " assigne a l'utilisateur " + email);
            return;
        }

        System.out.println("Utilisateur ou role introuvable");
    }

}
