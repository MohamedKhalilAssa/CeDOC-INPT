package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
}
