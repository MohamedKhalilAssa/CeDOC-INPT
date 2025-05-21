package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;
@Service
@RequiredArgsConstructor
public class ChefEquipeServiceImpl implements ChefEquipeService {

    @Override
    public boolean existsById(Long id) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public List<ChefEquipe> findAll() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public ChefEquipe findById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
