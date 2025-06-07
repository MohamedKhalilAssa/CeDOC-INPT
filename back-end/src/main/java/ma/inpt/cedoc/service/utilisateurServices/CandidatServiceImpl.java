package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.repositories.utilisateursRepositories.CandidatRepository;

@Service
@RequiredArgsConstructor
public class CandidatServiceImpl implements CandidatService {

    private final CandidatRepository candidatRepository;
    private final UtilisateurService utilisateurService;

    /* ================== CREATE ================== */
    @Override
    public CandidatResponseDTO saveCandidat(Candidat candidat) {
        // save candidat
        Candidat saved = candidatRepository.save(candidat);
        utilisateurService.assignRoleToUtilisateur(saved.getUtilisateur().getEmail(), "CANDIDAT");

        return toResponse(saved);
    }

    @Override
    public List<CandidatResponseDTO> saveAllCandidats(List<Candidat> candidats) {
        return candidatRepository.saveAll(candidats).stream().map(this::toResponse).toList();
    }

    /* ================== FIND ================== */
    @Override
    public Candidat findFullCandidatById(Long id) {
        return candidatRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidat introuvable"));
    }

    @Override
    public CandidatResponseDTO findCandidatById(Long id) {
        return toResponse(findFullCandidatById(id));
    }

    /**
     * Archive (ferme) le compte du candidat.
     * Pour cela, on récupère le candidat par son ID,
     * on met son attribut `archiver` à true, et on sauvegarde.
     */
    @Override
    @Transactional
    public boolean archiverCandidat(Long candidatId) {
        Optional<Candidat> opt = candidatRepository.findById(candidatId);
        if (opt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidat introuvable pour l’ID " + candidatId);
        }
        Candidat candidat = opt.get();
        // Supposons que l’entité Candidat possède un champ `private boolean archiver;`
        candidat.setArchiver(true);
        candidatRepository.save(candidat);
        return true;
    }

    /*
     * ================== UNUSED STUBS (pas encore nécessaires) ==================
     */
    @Override
    public CandidatResponseDTO findCandidatByEmail(String email) {
        return null;
    }

    @Override
    public CandidatResponseDTO findCandidatByTelephone(String telephone) {
        return null;
    }

    @Override
    public CandidatResponseDTO findCandidatByNomContainsOrPrenomContains(String query) {
        return null;
    }

    @Override
    public List<Candidat> findAllNonArchivedCandidats() {
        return null;
    }

    @Override
    public Candidat findFullCandidatByEmail(String email) {
        return candidatRepository.findByUtilisateurEmail(email).orElse(null);
    }

    @Override
    public Candidat findFullCandidatByTelephone(String telephone) {
        return null;
    }

    @Override
    public CandidatResponseDTO updateCandidat(Candidat candidat) {
        return null;
    }

    @Override
    public void deleteCandidat(Long id) {
    }

    @Override
    public boolean doesCandidatExistByEmail(String email) {
        return false;
    }

    @Override
    public boolean doesCandidatExistByTelephone(String telephone) {
        return false;
    }

    @Override
    public boolean archiverCandidatMyEmail(String email) {
        return false;
    }

    /* ================== DTO MAPPING UTILITY ================== */
    private CandidatResponseDTO toResponse(Candidat candidat) {
        return CandidatResponseDTO.builder()
                .id(candidat.getUtilisateur().getId())
                .email(candidat.getUtilisateur().getEmail())
                .nom(candidat.getUtilisateur().getNom())
                .prenom(candidat.getUtilisateur().getPrenom())
                .telephone(candidat.getUtilisateur().getTelephone())
                .archiver(candidat.isArchiver())
                .createdAt(candidat.getUtilisateur().getCreatedAt())
                .updatedAt(candidat.getUtilisateur().getUpdatedAt())
                .build();
    }
}
