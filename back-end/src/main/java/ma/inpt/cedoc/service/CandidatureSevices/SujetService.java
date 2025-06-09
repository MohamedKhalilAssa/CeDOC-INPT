package ma.inpt.cedoc.service.CandidatureSevices;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseSimpleDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

public interface SujetService {

    SujetResponseDTO proposerSujet(SujetRequestDTO dto);

    /* CREATE METHODS */
    // DTO-based methods
    SujetResponseDTO saveSujet(SujetRequestDTO dto);

    List<SujetResponseDTO> saveSujets(List<SujetRequestDTO> dtos);

    // Entity-based methods
    Sujet saveSujetEntity(Sujet sujet);

    List<Sujet> saveSujetsEntities(List<Sujet> sujets);

    /* UPDATE METHODS */
    // DTO-based methods
    SujetResponseDTO updateSujet(SujetRequestDTO dto, Long id);

    // Entity-based methods
    Sujet updateSujetEntity(Sujet sujet, Long id);

    /* DELETE METHODS */
    void deleteSujet(Sujet sujet);

    void deleteSujetById(Long id);

    void deleteAllSujets();

    /* GET METHODS */
    // DTO-based methods
    SujetResponseDTO getSujetById(Long id);

    List<SujetResponseDTO> getAllSujets();

    List<SujetResponseDTO> getSujetsByChefEquipeId(Long chefEquipeId);

    List<SujetResponseDTO> getSujetsByProfesseurId(Long professeurId);

    List<SujetResponseDTO> getSujetsByDirecteurDeTheseId(Long directeurDeTheseId);

    SujetResponseDTO getSujetByDoctorantId(Long doctorantId);

    List<SujetResponseDTO> getAllPublicSujets();

    // Simple DTO methods
    SujetResponseSimpleDTO getSimple(Long id);

    List<SujetResponseSimpleDTO> getAllSimple();

    /* PAGINATION METHODS */
    // Paginated DTO-based methods
    Page<SujetResponseDTO> getAllSujetsPaginated(Pageable pageable);

    Page<SujetResponseDTO> getAllPublicSujetsPaginated(Pageable pageable);

    Page<SujetResponseSimpleDTO> getAllSimplePaginated(Pageable pageable);

    // Entity-based methods
    Sujet getSujetEntityById(Long id);

    List<Sujet> getAllSujetsEntities();

    List<Sujet> getSujetsEntitiesByChefEquipeId(Long chefEquipeId);

    List<Sujet> getSujetsEntitiesByProfesseurId(Long professeurId);

    List<Sujet> getSujetsEntitiesByDirecteurDeTheseId(Long directeurDeTheseId);

    Sujet getSujetEntityByDoctorantId(Long doctorantId);

    List<Sujet> getAllPublicSujetsEntities();
}
