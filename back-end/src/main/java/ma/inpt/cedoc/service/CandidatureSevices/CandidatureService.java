package ma.inpt.cedoc.service.CandidatureSevices;

import java.time.LocalDate;
import java.util.List;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.EquipeDeRecherche;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;

public interface CandidatureService {

    // Provisoire
    void propositionSujet(Long professeurId, Long sujetId);

    CandidatResponseDTO registerCandidat(CandidatRequestDTO dto);

    // PUBLIC ACCESS
    List<EquipeDeRecherche> getAllEquipes();

    List<Professeur> getProfesseursByEquipeId(Long equipeId);

    List<Sujet> getSujetsByEquipeId(Long equipeId); // sujets publiés

    List<Sujet> getAllPublicSujets(); // sujets affichés publiquement

    // CHEF D EQUIPE ONLY
    Candidature accepterCandidature(Long candidatureId, LocalDate entretien); // notification + date

    Candidature refuserCandidature(Long candidatureId, String motif); // notification + fermeture compte

    // AUTO APRES 1 MOIS DE REFUS
    void fermerEtArchiverCompteCandidat(Long candidatId); // après un mois du refus

}
