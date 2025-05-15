package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Long> {
    Optional<Utilisateur> findByEmail(String email);

    Optional<Utilisateur> findByTelephone(String telephone);

    Page<Utilisateur> findByNomContainsIgnoreCaseOrPrenomContainsIgnoreCase(String nom, String prenom,
            Pageable pageable);

    boolean existsByEmail(String email);

    boolean existsByTelephone(String telephone);
}
