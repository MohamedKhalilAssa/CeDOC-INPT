package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;

public interface CandidatService {

    /* FIND METHODs */
    CandidatResponseDTO findCandidatById(Long id);

    CandidatResponseDTO findCandidatByEmail(String email);

    CandidatResponseDTO findCandidatByTelephone(String telephone);

    CandidatResponseDTO findCandidatByNomContainsOrPrenomContains(String query);

    List<Candidat> findAllNonArchivedCandidats();

    Candidat findFullCandidatById(Long id);

    Candidat findFullCandidatByEmail(String email);

    Candidat findFullCandidatByTelephone(String telephone);
    

    /* CREATE METHODs */
    CandidatResponseDTO saveCandidat(Candidat candidat);

    List<CandidatResponseDTO> saveAllCandidats(List<Candidat> candidats);

    /* UPDATE METHODs */
    CandidatResponseDTO updateCandidat(Candidat candidat);

    /* DELETE METHODs */
    void deleteCandidat(Long id);

    boolean doesCandidatExistByEmail(String email);

    boolean doesCandidatExistByTelephone(String telephone);

    boolean archiverCandidat(Long candidatId);

    boolean archiverCandidatMyEmail(String email);
}