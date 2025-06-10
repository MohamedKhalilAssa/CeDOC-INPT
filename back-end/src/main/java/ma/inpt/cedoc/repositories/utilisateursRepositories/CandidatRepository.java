package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;

public interface CandidatRepository extends JpaRepository<Candidat, Long> {
    Optional<Candidat> findByUtilisateurEmail(String email);
    Optional<Candidat> findByUtilisateurId(Long utilisateurId);
    
}