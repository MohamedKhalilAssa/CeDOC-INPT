package ma.inpt.cedoc.repositories.utilisateursRepositories;

import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
}
