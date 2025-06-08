package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ProfesseurRepository;

@Service
@RequiredArgsConstructor
public class ProfesseurServiceImpl implements ProfesseurService {

    private final ProfesseurRepository professeurRepository;

    @Override
    public Professeur createProfesseur(Professeur professeur) {
        return professeurRepository.save(professeur);
    }

    @Override
    public void deleteProfesseur(Long id) {
        professeurRepository.deleteById(id);
    }

    @Override
    public List<Professeur> getAllProfesseurs() {
        return professeurRepository.findAll();
    }

    @Override
    public Page<Professeur> getAllProfesseurs(Pageable pageable) {
        return professeurRepository.findAll(pageable);
    }

    @Override
    public Professeur getProfesseurById(Long id) {
        return professeurRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Professeur introuvable"));
    }

    @Override
    public Professeur updateProfesseur(Long id, Professeur professeur) {
        if (!professeurRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Professeur introuvable");
        }
        professeur.setId(id);
        return professeurRepository.save(professeur);
    }

    @Override
    public boolean existsById(Long id) {
        return professeurRepository.existsById(id);
    }

    @Override
    public List<Professeur> findAllByIds(List<Long> ids) {
        return professeurRepository.findAllById(ids);
    }
    
}
