package ma.inpt.cedoc.repositories;

import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
}
