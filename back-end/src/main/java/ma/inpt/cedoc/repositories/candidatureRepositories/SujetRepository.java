package ma.inpt.cedoc.repositories.candidatureRepositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;

public interface SujetRepository extends JpaRepository<Sujet, Long> {
    List<Sujet> findByChefEquipe(ChefEquipe chefEquipe);

    List<Sujet> findByChefEquipeId(Long chefEquipeId);

    List<Sujet> findByProfesseursId(Long professeurId);

    List<Sujet> findByDirecteurDeTheseId(Long directeurDeTheseId);

    Sujet findByDoctorantsId(Long id);

}
