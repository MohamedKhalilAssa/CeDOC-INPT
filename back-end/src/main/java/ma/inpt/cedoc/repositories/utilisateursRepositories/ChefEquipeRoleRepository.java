package ma.inpt.cedoc.repositories.utilisateursRepositories;

import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;

import java.util.List;
import java.util.Optional;

public interface ChefEquipeRoleRepository extends JpaRepository<ChefEquipeRole, Long> {

    Optional<ChefEquipeRole> findByProfesseurUtilisateurEmail(String email);
}
