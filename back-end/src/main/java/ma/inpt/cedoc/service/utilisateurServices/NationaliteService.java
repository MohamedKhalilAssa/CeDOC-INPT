package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.NationaliteRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.NationaliteResponseDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Nationalite;

public interface NationaliteService {

    /* CREATE METHODS */
    // DTO-based methods
    NationaliteResponseDTO saveNationalite(NationaliteRequestDTO dto);

    List<NationaliteResponseDTO> saveNationalites(List<NationaliteRequestDTO> dtos);

    // Entity-based methods
    Nationalite saveNationaliteEntity(Nationalite nationalite);

    List<Nationalite> saveNationalitesEntities(List<Nationalite> nationalites);

    /* UPDATE METHODS */
    // DTO-based methods
    NationaliteResponseDTO updateNationalite(NationaliteRequestDTO dto, Long id);

    // Entity-based methods
    Nationalite updateNationaliteEntity(Nationalite nationalite, Long id);

    /* DELETE METHODS */
    void deleteNationalite(Nationalite nationalite);

    void deleteNationaliteById(Long id);

    void deleteAllNationalites();

    /* GET METHODS */
    // DTO-based methods
    NationaliteResponseDTO getNationaliteById(Long id);

    List<NationaliteResponseDTO> getAllNationalites();

    boolean existsById(Long id);

    // Entity-based methods
    Nationalite getNationaliteEntityById(Long id);

    List<Nationalite> getAllNationalitesEntities();
}
