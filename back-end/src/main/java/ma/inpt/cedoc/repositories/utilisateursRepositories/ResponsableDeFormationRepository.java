package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.ResponsableDeFormation;

public interface ResponsableDeFormationRepository extends JpaRepository<ResponsableDeFormation, Long> {
}