package ma.inpt.cedoc.service.CandidatureSevices;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.UserDetails;

import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;

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

    /**
     * Création d'une nouvelle candidature (statut forcé à SOUMISE)
     */
    CandidatureResponseDTO createCandidature(CandidatureRequestDTO dto, UserDetails userDetails);

    /**
     * Modification d'une candidature existante, avant la date limite.
     */
    CandidatureResponseDTO updateCandidature(Long candidatureId, CandidatureRequestDTO dto, UserDetails userDetails);

    /**
     * Récupérer la liste des candidatures du candidat authentifié.
     */
    List<CandidatureResponseDTO> getMyCandidatures(UserDetails userDetails);

    /**
     * Basculer quotidiennement le statut SOUMISE → EN_COURS_DE_TRAITEMENT si on a atteint la date limite.
     */
    void basculerStatutEnCoursTraitement();

    /**
     * Archiver les candidats dont la candidature a été REJETÉE depuis ≥ 1 mois.
     */
    void archiverCandidatsRefuses();

    /**
     * Exposer les candidatures au chef d'équipe (par ID de chef d'équipe).
     */
    List<CandidatureResponseDTO> getCandidaturesByChefEquipeId(Long chefEquipeId);

    CandidatureResponseDTO getCandidatureById(Long candidatureId, UserDetails userDetails);
    void deleteCandidature(Long candidatureId, UserDetails userDetails);

    List<Candidature> findByChefEquipeRoleId(Long chefRoleId);
    List<Candidature> findByProfesseurId(Long professeurId);
    List<Candidature> getAccessibleCandidatures(UserDetails userDetails);
    Page<Candidature> getAccessibleCandidatures(UserDetails userDetails, Pageable pageable);
}
