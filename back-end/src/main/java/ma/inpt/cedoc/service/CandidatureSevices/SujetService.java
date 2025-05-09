package ma.inpt.cedoc.service.CandidatureSevices;

import java.util.List;

import ma.inpt.cedoc.model.entities.candidature.Sujet;

public interface SujetService {

    /* CREATE METHODS */
    Sujet saveSujet(Sujet sujet);

    List<Sujet> saveSujets(List<Sujet> sujets);

    /* UPDATE METHODS */
    Sujet updateSujet(Sujet sujet);

    /* DELETE METHODS */
    void deleteSujet(Sujet sujet);

    void deleteAllSujets();

    /* GET METHODS */
    Sujet getSujetById(Long id);

    List<Sujet> getAllSujets();

    List<Sujet> getSujetsByChefEquipeId(Long chefEquipeId);

    List<Sujet> getSujetsByProfesseurId(Long professeurId);

    List<Sujet> getSujetsByDirecteurDeTheseId(Long directeurDeTheseId);

    Sujet getSujetByDoctorantId(Long doctorant);
}
