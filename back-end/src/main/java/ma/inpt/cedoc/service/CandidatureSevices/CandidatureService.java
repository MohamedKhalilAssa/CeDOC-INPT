package ma.inpt.cedoc.service.CandidatureSevices;

import java.time.LocalDate;
import java.util.List;

import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;

public interface CandidatureService {

    // Provisoire
    void propositionSujet(Long professeurId, Long sujetId);

    CandidatResponseDTO registerCandidat(CandidatRequestDTO dto);

    // PUBLIC ACCESS
    List<EquipeSimpleDTO> getAllEquipes();

    List<ProfesseurResponseDTO> getProfesseursByEquipeId(Long equipeId);

    List<SujetResponseDTO> getSujetsByEquipeId(Long equipeId); // sujets publiés

    List<SujetResponseDTO> getAllPublicSujets(); // sujets affichés publiquement

    // CHEF D EQUIPE ONLY
    CandidatureResponseDTO accepterCandidature(Long candidatureId, LocalDate entretien); // notification + date

    CandidatureResponseDTO refuserCandidature(Long candidatureId, String motif); // notification + fermeture compte

    // AUTO APRES 1 MOIS DE REFUS
    void fermerEtArchiverCompteCandidat(Long candidatId); // après un mois du refus

}
