package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

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

    public Utilisateur findFullUtilisateurByEmail(String email);

    public Utilisateur findFullUtilisateurById(Long id);

    public Utilisateur findFullUtilisateurByTelephone(String telephone);

    public UtilisateurResponseDTO findUtilisateurById(Long id);

    public UtilisateurResponseDTO findUtilisateurByEmail(String email);

    public UtilisateurResponseDTO findUtilisateurByTelephone(String telephone);

    public List<UtilisateurResponseDTO> findAllUtilisateurs();

    public List<UtilisateurResponseDTO> searchByNomOuPrenom(String query);
}