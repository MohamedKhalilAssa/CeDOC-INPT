package ma.inpt.cedoc.service.CandidatureSevices;

import java.util.List;

import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

public interface SujetService {

    SujetResponseDTO proposerSujet(SujetRequestDTO dto);

    /* CREATE METHODS */
    SujetResponseDTO saveSujet(SujetRequestDTO dto);

    List<SujetResponseDTO> saveSujets(List<SujetRequestDTO> dtos);

    /* UPDATE METHODS */
    SujetResponseDTO updateSujet(SujetRequestDTO dto, Long id);

    /* DELETE METHODS */
    void deleteSujet(Sujet sujet);

    void deleteAllSujets();

    /* GET METHODS */
    SujetResponseDTO getSujetById(Long id);

    List<SujetResponseDTO> getAllSujets();

    List<SujetResponseDTO> getSujetsByChefEquipeId(Long chefEquipeId);

    List<SujetResponseDTO> getSujetsByProfesseurId(Long professeurId);

    List<SujetResponseDTO> getSujetsByDirecteurDeTheseId(Long directeurDeTheseId);

    SujetResponseDTO getSujetByDoctorantId(Long doctorantId);

    List<SujetResponseDTO> getAllPublicSujets();
}
