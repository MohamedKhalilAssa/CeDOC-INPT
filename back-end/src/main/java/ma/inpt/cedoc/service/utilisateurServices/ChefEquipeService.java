package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;

public interface ChefEquipeService {
    ChefEquipe findById(Long id);
    List<ChefEquipe> findAll();
    boolean existsById(Long id);
}
