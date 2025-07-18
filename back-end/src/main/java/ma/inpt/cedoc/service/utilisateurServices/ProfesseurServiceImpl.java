package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ProfesseurRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfesseurServiceImpl implements ProfesseurService {

    private final ProfesseurRepository professeurRepository;
    private final SujetRepository sujetRepository;

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

    @Override
    public List<Professeur> searchForProfesseurs(String query) {
        // TODO Auto-generated method stub
        return professeurRepository
                .findByUtilisateurNomContainingIgnoreCaseOrUtilisateurPrenomContainingIgnoreCaseOrUtilisateurEmailContainingIgnoreCase(
                        query,
                        query, query);
    }

    @Override
    public Professeur getProfesseurByEmail(String email) {
        // TODO Auto-generated method stub
        return professeurRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Professeur introuvable avec l'email : " + email));
    }

    @Override
    public List<Sujet> getSujetsByProfesseurId(Long professeurId) {
        return sujetRepository.findByProfesseursId(professeurId);
    }

}
