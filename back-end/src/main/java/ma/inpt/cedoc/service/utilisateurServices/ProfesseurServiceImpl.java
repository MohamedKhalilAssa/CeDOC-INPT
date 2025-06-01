package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

@Service
@RequiredArgsConstructor
public class ProfesseurServiceImpl implements ProfesseurService {

    @Override
    public Professeur createProfesseur(Professeur professeur) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public void deleteProfesseur(Long id) {
        // TODO Auto-generated method stub
        
    }

    @Override
    public List<Professeur> getAllProfesseurs() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Page<Professeur> getAllProfesseurs(Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Professeur getProfesseurById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Professeur updateProfesseur(Long id, Professeur professeur) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public boolean existsById(Long id) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public List<Professeur> findAllByIds(List<Long> ids) {
        // TODO Auto-generated method stub
        return null;
    }
    
}
