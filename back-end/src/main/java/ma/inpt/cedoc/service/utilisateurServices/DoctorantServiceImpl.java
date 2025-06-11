package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class DoctorantServiceImpl implements DoctorantService {

    private final DoctorantRepository doctorantRepository;

    @Override
    public Doctorant createDoctorant(Doctorant doctorant) {
        return doctorantRepository.save(doctorant);
    }

    @Override
    public void deleteDoctorant(Long id) {
        doctorantRepository.deleteById(id);
    }

    @Override
    public List<Doctorant> getAllDoctorants() {
        return doctorantRepository.findAll();
    }

    @Override
    public Page<Doctorant> getAllDoctorants(Pageable pageable) {
        return doctorantRepository.findAll(pageable);
    }

    @Override
    public Doctorant getDoctorantById(Long id) {
        return doctorantRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctorant introuvable"));
    }

    @Override
    public Doctorant updateDoctorant(Long id, Doctorant doctorant) {
        if (!doctorantRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Doctorant introuvable");
        }
        doctorant.setId(id);
        return doctorantRepository.save(doctorant);
    }

    @Override
    public boolean existsById(Long id) {
        return doctorantRepository.existsById(id);
    }

    @Override
    public List<Doctorant> findAllByIds(List<Long> ids) {
        return doctorantRepository.findAllById(ids);
    }

    @Override
    public List<Doctorant> searchForDoctorants(String query) {
        return doctorantRepository
                .findByUtilisateurNomContainingIgnoreCaseOrUtilisateurPrenomContainingIgnoreCaseOrUtilisateurEmailContainingIgnoreCase(
                        query, query, query);
    }

    @Override
    public Doctorant getDoctorantByEmail(String email) {
        return doctorantRepository.findByUtilisateurEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Doctorant introuvable avec l'email : " + email));
    }

    @Override
    public Doctorant getDoctorantByUtilisateurId(Long utilisateurId) {
        return doctorantRepository.findByUtilisateurId(utilisateurId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Doctorant introuvable avec l'ID utilisateur : " + utilisateurId));
    }
}
