package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.data.domain.Page;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

public interface UtilisateurService {
    public void assignRoleToUtilisateur(String email, String roleName);

    public UtilisateurResponseDTO saveUtilisateur(Utilisateur utilisateurRequestDTO);

    public List<UtilisateurResponseDTO> saveAllUtilisateurs(List<Utilisateur> utilisateurs);

    public UtilisateurResponseDTO updateUtilisateur(Utilisateur utilisateurRequestDTO);

    public void deleteUtilisateur(Long id);

    public boolean doesUserExistByEmail(String email);

    public boolean doesUserExistByTelephone(String telephone);

    public Utilisateur getFullUtilisateurByEmail(String email);

    public Utilisateur getFullUtilisateurById(Long id);

    public Utilisateur getFullUtilisateurByTelephone(String telephone);

    public UtilisateurResponseDTO getUtilisateurById(Long id);

    public UtilisateurResponseDTO getUtilisateurByEmail(String email);

    public UtilisateurResponseDTO getUtilisateurByTelephone(String telephone);

    public List<UtilisateurResponseDTO> getAllUtilisateurs();

    public Page<UtilisateurResponseDTO> searchByNomOuPrenom(String query);
}