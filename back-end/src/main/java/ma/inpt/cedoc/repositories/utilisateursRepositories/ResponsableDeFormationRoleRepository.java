package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.ResponsableDeFormationRole;

public interface ResponsableDeFormationRoleRepository extends JpaRepository<ResponsableDeFormationRole, Long> {
}