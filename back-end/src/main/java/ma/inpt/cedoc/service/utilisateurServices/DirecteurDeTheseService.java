package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;

public interface DirecteurDeTheseService {
    DirecteurDeThese findById(Long id);
    List<DirecteurDeThese> findAll();
    boolean existsById(Long id);
}
