package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.UtilisateurMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.Role;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.utilisateursRepositories.RoleRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper utilisateurMapper;
    private final RoleRepository roleRepository;

    public void assignRoleToUtilisateur(String email, String roleName) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).orElse(null);
        Role role = roleRepository.findByIntitule(roleName).orElse(null);

        if (utilisateur != null && role != null) {
            utilisateur.getRoles().add(role); // 🔥 Just add to the existing set
            utilisateurRepository.save(utilisateur);
            System.out.println("Role " + roleName + " assigne a l'utilisateur " + email);
            return;
        }

        System.out.println("Utilisateur ou role introuvable");
    }

    /*-----------------Delete----------------- */
    @Override
    public void deleteUtilisateur(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        utilisateurRepository.delete(utilisateur);
    }

    /*-----------------Search----------------- */
    @Override
    public boolean doesUserExistByEmail(String email) {
        if (utilisateurRepository.existsByEmail(email)) {
            return true;
        }
        return false;
    }

    @Override
    public List<UtilisateurResponseDTO> findAllUtilisateurs() {
        List<UtilisateurResponseDTO> utilisateurs = utilisateurRepository.findAll().stream()
                .map(utilisateurMapper::utilisateurToUtilisateurResponseDTO).collect(Collectors.toList());

        return utilisateurs;
    }

    @Override
    public UtilisateurResponseDTO findUtilisateurByEmail(String email) {

        return utilisateurMapper
                .utilisateurToUtilisateurResponseDTOFullRoles(utilisateurRepository.findByEmail(email).orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable")));
    }

    @Override
    public UtilisateurResponseDTO findUtilisateurById(Long id) {
        return utilisateurMapper.utilisateurToUtilisateurResponseDTOFullRoles(
                utilisateurRepository.findById(id).orElseThrow(
                        () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable")));
    }

    @Override
    public Utilisateur findFullUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
    }

    @Override
    public Utilisateur findFullUtilisateurById(Long id) {
        return utilisateurRepository.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
    }

    @Override
    public Utilisateur findFullUtilisateurByTelephone(String telephone) {
        return utilisateurRepository.findByTelephone(telephone).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
    }

    @Override
    public Page<UtilisateurResponseDTO> searchByNomOuPrenom(String query) {
        Pageable pageable = PageRequest.of(0, 10);

        Page<Utilisateur> utilisateursPage = utilisateurRepository
                .findByNomContainsIgnoreCaseOrPrenomContainsIgnoreCase(query, query, pageable);

        return utilisateursPage.map(utilisateurMapper::utilisateurToUtilisateurResponseDTO);
    }

    @Override
    public boolean doesUserExistByTelephone(String telephone) {
        if (utilisateurRepository.existsByTelephone(telephone)) {
            return true;
        }
        return false;
    }

    @Override
    public UtilisateurResponseDTO findUtilisateurByTelephone(String telephone) {

        return utilisateurMapper
                .utilisateurToUtilisateurResponseDTOFullRoles(
                        utilisateurRepository.findByTelephone(telephone).orElseThrow(
                                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable")));
    }

    /*-----------------Save----------------- */
    @Override
    public List<UtilisateurResponseDTO> saveAllUtilisateurs(List<Utilisateur> utilisateurs) {

        List<UtilisateurResponseDTO> utilisateurResponseDTO = utilisateurRepository.saveAll(utilisateurs).stream()
                .map(utilisateurMapper::utilisateurToUtilisateurResponseDTO).collect(Collectors.toList());
        return utilisateurResponseDTO;
    }

    @Override
    public UtilisateurResponseDTO saveUtilisateur(Utilisateur utilisateur) {
        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Utilisateur deja existant");
        }
        return utilisateurMapper.utilisateurToUtilisateurResponseDTOFullRoles(
                utilisateurRepository.save(utilisateur));
    }

    /*-----------------Update----------------- */
    @Override
    public UtilisateurResponseDTO updateUtilisateur(Utilisateur utilisateur) {

        return utilisateurMapper.utilisateurToUtilisateurResponseDTOFullRoles(
                utilisateurRepository.save(utilisateur));
    }

}
