package ma.inpt.cedoc.repositories.candidatureRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;

public interface SujetRepository extends JpaRepository<Sujet, Long> {
    List<Sujet> findByChefEquipe(ChefEquipeRole chefEquipe);

    List<Sujet> findByChefEquipeId(Long chefEquipeId);

    List<Sujet> findByProfesseursId(Long professeurId);
    List<Sujet> findByChefEquipeRoleId(Long chefEquipeRoleId);
    
    List<Sujet> findByDirecteurDeTheseId(Long directeurDeTheseRoleId);

    Sujet findByDoctorantsId(Long id);

}
