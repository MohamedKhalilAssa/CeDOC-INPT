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
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.UtilisateurMapperImpl;
import ma.inpt.cedoc.model.entities.utilisateurs.Role;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.utilisateursRepositories.RoleRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class UtilisateurServiceImpl implements UtilisateurService {

    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapperImpl utilisateurMapper;
    private final RoleRepository roleRepository;

    @Override
    public void assignRoleToUtilisateur(String email, String roleName) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email).orElse(null);
        Role role = roleRepository.findByIntitule(roleName).orElse(null);

        if (utilisateur != null && role != null) {
            utilisateur.getRoles().add(role);
            utilisateurRepository.save(utilisateur);
            System.out.println("Role " + roleName + " assigné à l'utilisateur " + email);
            return;
        }

        System.out.println("Utilisateur ou rôle introuvable");
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
        return utilisateurRepository.existsByEmail(email);
    }

    @Override
    public boolean doesUserExistByTelephone(String telephone) {
        return utilisateurRepository.existsByTelephone(telephone);
    }

    @Override
    public List<UtilisateurResponseDTO> findAllUtilisateurs() {
        return utilisateurRepository.findAll().stream()
                .map(utilisateurMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UtilisateurResponseDTO findUtilisateurByEmail(String email) {
        Utilisateur utilisateur = utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
        return utilisateurMapper.toResponseWithRoles(utilisateur);
    }

    @Override
    public UtilisateurResponseDTO findUtilisateurById(Long id) {
        Utilisateur utilisateur = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
        return utilisateurMapper.toResponseWithRoles(utilisateur);
    }

    @Override
    public UtilisateurResponseDTO findUtilisateurByTelephone(String telephone) {
        Utilisateur utilisateur = utilisateurRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
        return utilisateurMapper.toResponseWithRoles(utilisateur);
    }

    @Override
    public Utilisateur findFullUtilisateurByEmail(String email) {
        return utilisateurRepository.findByEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
    }

    @Override
    public Utilisateur findFullUtilisateurById(Long id) {
        return utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
    }

    @Override
    public Utilisateur findFullUtilisateurByTelephone(String telephone) {
        return utilisateurRepository.findByTelephone(telephone)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));
    }

    @Override
    public Page<UtilisateurResponseDTO> searchByNomOuPrenom(String query) {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Utilisateur> utilisateursPage = utilisateurRepository
                .findByNomContainsIgnoreCaseOrPrenomContainsIgnoreCase(query, query, pageable);
        return utilisateursPage.map(utilisateurMapper::toResponse);
    }

    /*-----------------Save----------------- */
    @Override
    public List<UtilisateurResponseDTO> saveAllUtilisateurs(List<Utilisateur> utilisateurs) {
        return utilisateurRepository.saveAll(utilisateurs).stream()
                .map(utilisateurMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UtilisateurResponseDTO saveUtilisateur(Utilisateur utilisateur) {
        if (utilisateurRepository.existsByEmail(utilisateur.getEmail())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Utilisateur déjà existant");
        }
        Utilisateur saved = utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toResponseWithRoles(saved);
    }

    /*-----------------Update----------------- */
    @Override
    public UtilisateurResponseDTO updateUtilisateur(Utilisateur utilisateur) {
        Utilisateur updated = utilisateurRepository.save(utilisateur);
        return utilisateurMapper.toResponseWithRoles(updated);
    }
}
