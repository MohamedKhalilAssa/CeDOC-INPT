package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
@Service
@RequiredArgsConstructor
public class DirecteurDeTheseServiceImpl implements DirecteurDeTheseService {

    @Override
    public boolean existsById(Long id) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public List<DirecteurDeThese> findAll() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public DirecteurDeThese findById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
