package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.repositories.utilisateursRepositories.CandidatRepository;

@Service
@RequiredArgsConstructor
public class CandidatServiceImpl implements CandidatService {

    private final CandidatRepository candidatRepository;

    /* ================== CREATE ================== */
    @Override
    public CandidatResponseDTO saveCandidat(Candidat candidat) {
        return toResponse(candidatRepository.save(candidat));
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

    /* ================== UNUSED STUBS (pas encore nécessaires) ================== */
    @Override public CandidatResponseDTO findCandidatByEmail(String email) { return null; }
    @Override public CandidatResponseDTO findCandidatByTelephone(String telephone) { return null; }
    @Override public CandidatResponseDTO findCandidatByNomContainsOrPrenomContains(String query) { return null; }
    @Override public List<Candidat> findAllNonArchivedCandidats() { return null; }
    @Override public Candidat findFullCandidatByEmail(String email) { return null; }
    @Override public Candidat findFullCandidatByTelephone(String telephone) { return null; }
    @Override public CandidatResponseDTO updateCandidat(Candidat candidat) { return null; }
    @Override public void deleteCandidat(Long id) {}
    @Override public boolean doesCandidatExistByEmail(String email) { return false; }
    @Override public boolean doesCandidatExistByTelephone(String telephone) { return false; }
    @Override public boolean archiverCandidat(Long id) { return false; }
    @Override public boolean archiverCandidatMyEmail(String email) { return false; }

    /* ================== DTO MAPPING UTILITY ================== */
    private CandidatResponseDTO toResponse(Candidat candidat) {
        return CandidatResponseDTO.builder()
                .id(candidat.getId())
                .email(candidat.getEmail())
                .nom(candidat.getNom())
                .prenom(candidat.getPrenom())
                .telephone(candidat.getTelephone())
                .archiver(candidat.isArchiver())
                .createdAt(candidat.getCreatedAt())
                .updatedAt(candidat.getUpdatedAt())
                .build();
    }
}
