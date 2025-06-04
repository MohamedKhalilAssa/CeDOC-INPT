package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;

public interface DirecteurDeTheseRoleRepository extends JpaRepository<DirecteurDeTheseRole, Long> {

}
