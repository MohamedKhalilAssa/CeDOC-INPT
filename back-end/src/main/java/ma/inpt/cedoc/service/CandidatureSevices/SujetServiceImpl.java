package ma.inpt.cedoc.service.CandidatureSevices;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;

@Service
@RequiredArgsConstructor

public class SujetServiceImpl implements SujetService {

    private final SujetRepository sujetRepository;

    /* CREATE --------------------------------------------- */
    @Override
    public Sujet saveSujet(Sujet sujet) {
        return sujetRepository.save(sujet);
    }

    @Override
    public List<Sujet> saveSujets(List<Sujet> sujets) {
        return sujetRepository.saveAll(sujets);
    }

    /* UPDATE --------------------------------------------- */
    @Override
    public Sujet updateSujet(Sujet sujet) {
        if (!sujetRepository.existsById(sujet.getId())) {
            throw new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + sujet.getId());
        }
        return sujetRepository.save(sujet);
    }

    /* DELETE --------------------------------------------- */
    @Override
    public void deleteSujet(Sujet sujet) {
        if (!sujetRepository.existsById(sujet.getId())) {
            throw new EntityNotFoundException(
                    "Impossible de supprimer : sujet introuvable avec l'identifiant : " + sujet.getId());
        }
        sujetRepository.delete(sujet);
    }

    @Override
    public void deleteAllSujets() {
        sujetRepository.deleteAll();
    }

    /* GET --------------------------------------------- */
    @Override
    public Sujet getSujetById(Long id) {
        return sujetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + id));
    }

    @Override
    public List<Sujet> getAllSujets() {
        return sujetRepository.findAll();
    }

    @Override
    public List<Sujet> getSujetsByChefEquipeId(Long chefEquipeId) {
        return sujetRepository.findByChefEquipeId(chefEquipeId);
    }

    @Override
    public List<Sujet> getSujetsByProfesseurId(Long professeurId) {
        return sujetRepository.findByProfesseursId(professeurId);
    }

    @Override
    public List<Sujet> getSujetsByDirecteurDeTheseId(Long directeurDeTheseId) {
        return sujetRepository.findByDirecteurDeTheseId(directeurDeTheseId);
    }

    @Override
    public Sujet getSujetByDoctorantId(Long doctorantId) {
        Sujet sujet = sujetRepository.findByDoctorantsId(doctorantId);
        if (sujet == null) {
            throw new EntityNotFoundException(
                    "Aucun sujet trouvé pour le doctorant avec l'identifiant : " + doctorantId);
        }
        return sujet;
    }
}
