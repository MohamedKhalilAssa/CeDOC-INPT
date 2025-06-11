package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

public interface DoctorantRepository extends JpaRepository<Doctorant, Long> {
    Optional<Doctorant> findByUtilisateurEmail(String username);

    public Optional<Long> getIdByUtilisateurEmail(String email);

    Optional<Doctorant> findByUtilisateurId(Long declarantId);

    List<Doctorant> findByDirecteurDeTheseId(Long directeurDeTheseId);

    List<Doctorant> findByUtilisateurNomContainingIgnoreCaseOrUtilisateurPrenomContainingIgnoreCaseOrUtilisateurEmailContainingIgnoreCase(
            String nom, String prenom, String email);
}