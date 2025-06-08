package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Professeur;

public interface ProfesseurService {
    Professeur createProfesseur(Professeur professeur);

    Professeur getProfesseurById(Long id);

    Professeur updateProfesseur(Long id, Professeur professeur);

    void deleteProfesseur(Long id);

    List<Professeur> getAllProfesseurs();

    Page<Professeur> getAllProfesseurs(Pageable pageable);

    Professeur getProfesseurByEmail(String email);

    List<Professeur> findAllByIds(List<Long> ids);

    boolean existsById(Long id);

    List<Professeur> searchForProfesseurs(
            String query);
}
