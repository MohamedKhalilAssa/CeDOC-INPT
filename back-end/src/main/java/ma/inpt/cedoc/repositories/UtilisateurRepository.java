package ma.inpt.cedoc.repositories;

import ma.inpt.cedoc.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
}
