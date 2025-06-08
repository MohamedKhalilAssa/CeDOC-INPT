package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.repositories.model.entities.utilisateurs.DirecteurDeTheseRole;

public interface DirecteurDeTheseService {
    DirecteurDeTheseRole findById(Long id);
    List<DirecteurDeTheseRole> findAll();
    boolean existsById(Long id);
}
