package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.LieuDeNaissanceRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.LieuDeNaissanceResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.LieuDeNaissance;

public interface LieuDeNaissanceService {

    // ========== DTO-based service methods ==========

   
    LieuDeNaissanceResponseDTO saveLieuDeNaissance(LieuDeNaissanceRequestDTO requestDTO);

    
    LieuDeNaissanceResponseDTO getLieuDeNaissanceById(Long id);

    
    List<LieuDeNaissanceResponseDTO> getAllLieuxDeNaissance();

   
    LieuDeNaissanceResponseDTO updateLieuDeNaissance(Long id, LieuDeNaissanceRequestDTO requestDTO);


    void deleteLieuDeNaissance(Long id);


    boolean existsLieuDeNaissanceById(Long id);

    // ========== Entity-based service methods ==========

  
    LieuDeNaissance saveLieuDeNaissanceEntity(LieuDeNaissance lieuDeNaissance);

  
    LieuDeNaissance findById(Long id);

   
    List<LieuDeNaissance> findAllLieuxDeNaissance();

  
    LieuDeNaissance updateLieuDeNaissanceEntity(LieuDeNaissance lieuDeNaissance);


    void deleteLieuDeNaissanceEntity(LieuDeNaissance lieuDeNaissance);
}
