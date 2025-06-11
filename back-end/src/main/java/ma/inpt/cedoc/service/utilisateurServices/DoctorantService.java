package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

public interface DoctorantService {
    Doctorant createDoctorant(Doctorant doctorant);

    Doctorant getDoctorantById(Long id);

    Doctorant updateDoctorant(Long id, Doctorant doctorant);

    void deleteDoctorant(Long id);

    List<Doctorant> getAllDoctorants();

    Page<Doctorant> getAllDoctorants(Pageable pageable);

    Doctorant getDoctorantByEmail(String email);

    List<Doctorant> findAllByIds(List<Long> ids);

    boolean existsById(Long id);

    List<Doctorant> searchForDoctorants(String query);

    Doctorant getDoctorantByUtilisateurId(Long utilisateurId);
}
