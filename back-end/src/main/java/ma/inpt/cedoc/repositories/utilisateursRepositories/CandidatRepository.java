package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Candidat;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
    Optional<Candidat> findByUtilisateurEmail(String email);
}