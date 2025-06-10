package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Role;
import ma.inpt.cedoc.model.enums.utilisateur_enums.RoleEnum;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByIntitule(String intitule);
    Optional<Role> findByIntitule(RoleEnum intitule);
}
