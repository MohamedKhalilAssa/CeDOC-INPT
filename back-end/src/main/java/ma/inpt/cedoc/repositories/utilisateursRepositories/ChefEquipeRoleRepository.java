package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;

public interface ChefEquipeRoleRepository extends JpaRepository<ChefEquipeRole, Long> {
    Optional<ChefEquipeRole> findByProfesseurUtilisateurId(Long utilisateurId);
}
