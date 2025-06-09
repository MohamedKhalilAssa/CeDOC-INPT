package ma.inpt.cedoc.repositories.utilisateursRepositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;

public interface ChefEquipeRoleRepository extends JpaRepository<ChefEquipeRole, Long> {
    Optional<ChefEquipeRole> findByProfesseurUtilisateurEmail(String email);

    @Query("SELECT c FROM ChefEquipeRole c " +
            "LEFT JOIN FETCH c.equipeDeRecherche e " +
            "LEFT JOIN FETCH e.membres " +
            "WHERE c.professeur.utilisateur.email = :email")
    Optional<ChefEquipeRole> findByProfesseurUtilisateurEmailWithMembers(@Param("email") String email);
}
