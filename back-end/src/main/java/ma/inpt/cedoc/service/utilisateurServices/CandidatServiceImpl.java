package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;

@Service
@RequiredArgsConstructor
public class CandidatServiceImpl implements CandidatService {

    @Override
    public boolean archiverCandidat(Long id) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean archiverCandidatMyEmail(String email) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public void deleteCandidat(Long id) {
        // TODO Auto-generated method stub

    }

    @Override
    public boolean doesCandidatExistByEmail(String email) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public boolean doesCandidatExistByTelephone(String telephone) {
        // TODO Auto-generated method stub
        return false;
    }

    @Override
    public List<Candidat> findAllNonArchivedCandidats() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public CandidatResponseDTO findCandidatByEmail(String email) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public CandidatResponseDTO findCandidatById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public CandidatResponseDTO findCandidatByNomContainsOrPrenomContains(String query) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public CandidatResponseDTO findCandidatByTelephone(String telephone) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Candidat findFullCandidatByEmail(String email) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Candidat findFullCandidatById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Candidat findFullCandidatByTelephone(String telephone) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public List<CandidatResponseDTO> saveAllCandidats(List<Candidat> candidats) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public CandidatResponseDTO saveCandidat(Candidat candidat) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public CandidatResponseDTO updateCandidat(Candidat candidat) {
        // TODO Auto-generated method stub
        return null;
    }

}