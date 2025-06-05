package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;

import java.util.Optional;

public interface ChefEquipeRoleRepository extends JpaRepository<ChefEquipeRole, Long> {

    Optional<ChefEquipeRole> findByEmail(String email);
}
