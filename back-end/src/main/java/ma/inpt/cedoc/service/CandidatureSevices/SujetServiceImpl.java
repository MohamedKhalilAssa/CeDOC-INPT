package ma.inpt.cedoc.service.CandidatureSevices;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.SujetMapper;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;

@Service
@RequiredArgsConstructor

public class SujetServiceImpl implements SujetService {

    private final SujetRepository sujetRepository;
    private final SujetMapper sujetMapper;

    /* CREATE --------------------------------------------- */
    @Override
    public SujetResponseDTO saveSujet(SujetRequestDTO dto) {
        Sujet sujet = sujetMapper.toEntity(dto);
        return sujetMapper.toResponseDTO(sujetRepository.save(sujet));
    }

    @Override
    public List<SujetResponseDTO> saveSujets(List<SujetRequestDTO> dtos) {
        List<Sujet> sujets = dtos.stream()
                .map(sujetMapper::toEntity)
                .collect(Collectors.toList());
        return sujetRepository.saveAll(sujets).stream()
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    /* UPDATE --------------------------------------------- */
    @Override
    public SujetResponseDTO updateSujet(SujetRequestDTO dto, Long id) {
        if (!sujetRepository.existsById(id)) {
            throw new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + id);
        }
        Sujet sujet = sujetMapper.toEntity(dto);
        sujet.setId(id);
        return sujetMapper.toResponseDTO(sujetRepository.save(sujet));
    }

    /* DELETE --------------------------------------------- */
    @Override
    public void deleteSujet(Sujet sujet) {
        if (!sujetRepository.existsById(sujet.getId())) {
            throw new EntityNotFoundException(
                    "Impossible de supprimer : sujet introuvable avec l'identifiant : " + sujet.getId());
        }
        sujetRepository.delete(sujet);
    }

    @Override
    public void deleteAllSujets() {
        sujetRepository.deleteAll();
    }

    /* GET --------------------------------------------- */
    @Override
    public SujetResponseDTO getSujetById(Long id) {
        Sujet sujet = sujetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + id));
        return sujetMapper.toResponseDTO(sujet);
    }

    @Override
    public List<SujetResponseDTO> getAllSujets() {
        return sujetRepository.findAll().stream()
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SujetResponseDTO> getSujetsByChefEquipeId(Long chefEquipeId) {
        return sujetRepository.findByChefEquipeId(chefEquipeId).stream()
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SujetResponseDTO> getSujetsByProfesseurId(Long professeurId) {
        return sujetRepository.findByProfesseursId(professeurId).stream()
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SujetResponseDTO> getSujetsByDirecteurDeTheseId(Long directeurDeTheseId) {
        return sujetRepository.findByDirecteurDeTheseId(directeurDeTheseId).stream()
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public SujetResponseDTO getSujetByDoctorantId(Long doctorantId) {
        Sujet sujet = sujetRepository.findByDoctorantsId(doctorantId);
        if (sujet == null) {
            throw new EntityNotFoundException("Aucun sujet trouvé pour le doctorant avec l'identifiant : " + doctorantId);
        }
        return sujetMapper.toResponseDTO(sujet);
    }

    @Override
    public SujetResponseDTO proposerSujet(SujetRequestDTO dto) {
        // Récupération de l'entité Sujet depuis le DTO
        Sujet sujet = sujetMapper.toEntity(dto);
        List<Professeur> professeurs = sujet.getProfesseurs();

        // Sécurité : vérifier que les professeurs ont une équipe
        for (Professeur professeur : professeurs) {
            if (professeur.getEquipeDeRechercheAcceuillante() == null) {
                throw new IllegalArgumentException("Le professeur avec l'ID " + professeur.getId()
                    + " n'appartient à aucune équipe.");
            }
        }

        // TODO: Implémenter la logique pour gérer plusieurs chefs d'équipes
        // Actuellement, on ne supporte qu'un seul chefEquipe pour simplification temporaire
        // sujet.setChefsEquipes(déduits des équipes des profs);
        // sujet.setChefsAyantValide(new ArrayList<>());

        // Le sujet est invisible jusqu'à validation (future logique)
        sujet.setValide(false);
        sujet.setEstPublic(false);

        // Persistance
        Sujet saved = sujetRepository.save(sujet);

        return sujetMapper.toResponseDTO(saved);
    }

    // les candidats ne voient que les sujets validés et publics.
    @Override
    public List<SujetResponseDTO> getAllPublicSujets() {
        return sujetRepository.findAll().stream()
                .filter(Sujet::isEstPublic)
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }
}
