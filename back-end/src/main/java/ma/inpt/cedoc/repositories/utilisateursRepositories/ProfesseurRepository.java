package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Professeur;

public interface ProfesseurRepository extends JpaRepository<Professeur, Long> {
    List<Professeur> findByUtilisateurNomContainingIgnoreCaseOrUtilisateurPrenomContainingIgnoreCaseOrUtilisateurEmailContainingIgnoreCase(
            String nom, String prenom, String email);

    Optional<Professeur> findByUtilisateurEmail(String email);
}