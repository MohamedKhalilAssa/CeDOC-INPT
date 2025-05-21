package ma.inpt.cedoc.service.CandidatureSevices;

import java.util.List;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
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

    @Override
    public Sujet proposerSujet(Sujet sujet, List<Professeur> professeurs) {
        // Vérifier que la liste des professeurs n'est pas vide
        if (professeurs == null || professeurs.isEmpty()) {
            throw new IllegalArgumentException("Au moins un professeur doit proposer le sujet.");
        }

        // Associer les professeurs au sujet
        for (Professeur professeur : professeurs) {
            if (professeur.getEquipeDeRechercheAcceuillante() == null) {
                throw new IllegalArgumentException("Le professeur avec l'ID " + professeur.getId() + " n'appartient à aucune équipe.");
            }
        }

        // Ajout des professeurs au sujet
        sujet.setProfesseurs(professeurs);

        // Le sujet n'est pas encore public tant qu'il n'est pas validé par le chef de l'équipe
        sujet.setEstPublic(false);

        // Enregistrement initial du sujet
        return sujetRepository.save(sujet);
    }
}
