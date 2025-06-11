package ma.inpt.cedoc.service.utilisateurServices;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.EquipeResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.DTOs.mapper.Global.PaginatedMapper;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.EquipeMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.*;
import ma.inpt.cedoc.repositories.utilisateursRepositories.*;

@Service
@RequiredArgsConstructor
@Transactional
public class EquipeServiceImpl implements EquipeService {

    private final EquipeDeRechercheRepository equipeRepository;
    private final ChefEquipeRoleRepository chefEquipeRoleRepository;
    private final ProfesseurRepository professeurRepository;
    private final DoctorantRepository doctorantRepository;
    private final ChefEquipeService chefEquipeRoleService;
    private final EquipeMapper equipeMapper;

    /* CREATE --------------------------------------------- */
    // DTO-based methods
    @Override
    public EquipeResponseDTO saveEquipe(EquipeRequestDTO dto) {
        EquipeDeRecherche equipe = equipeMapper.toEntity(dto);

        // Set chef equipe if provided
        if (dto.getChefEquipeId() != null) {
            ChefEquipeRole chefEquipe = chefEquipeRoleRepository.findById(dto.getChefEquipeId())
                    .orElse(null);
                    if(chefEquipe == null) {
                        chefEquipe = ChefEquipeRole.builder()
                                .professeur(professeurRepository.findById(dto.getChefEquipeId())
                                        .orElseThrow(() -> new EntityNotFoundException(
                                                "Professeur introuvable avec l'identifiant : " + dto.getChefEquipeId())))
                                .build();
                        chefEquipeRoleService.createChefEquipe(chefEquipe);
                    }
            equipe.setChefEquipe(chefEquipe);
        }

        // Set membres (professeurs) if provided
        if (dto.getMembreIds() != null && !dto.getMembreIds().isEmpty()) {
            List<Professeur> membres = professeurRepository.findAllById(dto.getMembreIds());
            if (membres.size() != dto.getMembreIds().size()) {
                throw new EntityNotFoundException("Un ou plusieurs professeurs introuvables dans la liste des membres");
            }
            equipe.setMembres(membres);
            
            // Set the team reference for each member
            for (Professeur membre : membres) {
                membre.setEquipeDeRechercheAcceuillante(equipe);
            }
        } else {
            equipe.setMembres(new ArrayList<>());
        }

        // Set doctorants if provided
        if (dto.getDoctorantIds() != null && !dto.getDoctorantIds().isEmpty()) {
            List<Doctorant> doctorants = doctorantRepository.findAllById(dto.getDoctorantIds());
            if (doctorants.size() != dto.getDoctorantIds().size()) {
                throw new EntityNotFoundException("Un ou plusieurs doctorants introuvables dans la liste des doctorants");
            }
            equipe.setDoctorants(doctorants);
            
            // Set the team reference for each doctorant
            for (Doctorant doctorant : doctorants) {
                doctorant.setEquipeDeRecherche(equipe);
            }
        } else {
            equipe.setDoctorants(new ArrayList<>());
        }

        return equipeMapper.toResponseDTO(equipeRepository.save(equipe));
    }

    @Override
    public List<EquipeResponseDTO> saveEquipes(List<EquipeRequestDTO> dtos) {
        List<EquipeDeRecherche> equipes = dtos.stream()
                .map(dto -> {
                    EquipeDeRecherche equipe = equipeMapper.toEntity(dto);
                    
                    // Set chef equipe if provided
                    if (dto.getChefEquipeId() != null) {
                        ChefEquipeRole chefEquipe = chefEquipeRoleRepository.findById(dto.getChefEquipeId())
                                .orElseThrow(() -> new EntityNotFoundException(
                                        "Chef d'équipe introuvable avec l'identifiant : " + dto.getChefEquipeId()));
                        equipe.setChefEquipe(chefEquipe);
                    }

                    // Set membres (professeurs) if provided
                    if (dto.getMembreIds() != null && !dto.getMembreIds().isEmpty()) {
                        List<Professeur> membres = professeurRepository.findAllById(dto.getMembreIds());
                        if (membres.size() != dto.getMembreIds().size()) {
                            throw new EntityNotFoundException("Un ou plusieurs professeurs introuvables dans la liste des membres");
                        }
                        equipe.setMembres(membres);
                        
                        // Set the team reference for each member
                        for (Professeur membre : membres) {
                            membre.setEquipeDeRechercheAcceuillante(equipe);
                        }
                    } else {
                        equipe.setMembres(new ArrayList<>());
                    }

                    // Set doctorants if provided
                    if (dto.getDoctorantIds() != null && !dto.getDoctorantIds().isEmpty()) {
                        List<Doctorant> doctorants = doctorantRepository.findAllById(dto.getDoctorantIds());
                        if (doctorants.size() != dto.getDoctorantIds().size()) {
                            throw new EntityNotFoundException("Un ou plusieurs doctorants introuvables dans la liste des doctorants");
                        }
                        equipe.setDoctorants(doctorants);
                        
                        // Set the team reference for each doctorant
                        for (Doctorant doctorant : doctorants) {
                            doctorant.setEquipeDeRecherche(equipe);
                        }
                    } else {
                        equipe.setDoctorants(new ArrayList<>());
                    }
                    
                    return equipe;
                })
                .collect(Collectors.toList());
        return equipeRepository.saveAll(equipes).stream()
                .map(equipeMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Entity-based methods
    @Override
    public EquipeDeRecherche saveEquipeEntity(EquipeDeRecherche equipe) {
        return equipeRepository.save(equipe);
    }

    @Override
    public List<EquipeDeRecherche> saveEquipesEntities(List<EquipeDeRecherche> equipes) {
        return equipeRepository.saveAll(equipes);
    }

    /* UPDATE --------------------------------------------- */
    // DTO-based methods
    @Override
    public EquipeResponseDTO updateEquipe(EquipeRequestDTO dto, Long id) {
        if (!equipeRepository.existsById(id)) {
            throw new EntityNotFoundException("Équipe introuvable avec l'identifiant : " + id);
        }
        EquipeDeRecherche toUpdate = equipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Équipe introuvable avec l'identifiant : " + id));

        EquipeDeRecherche equipe = equipeMapper.updateFromRequestDTO(toUpdate, dto);

        // Update chef equipe if provided
        if (dto.getChefEquipeId() != null) {
            ChefEquipeRole chefEquipe = chefEquipeRoleRepository.findById(dto.getChefEquipeId())
                    .orElseThrow(() -> new EntityNotFoundException(
                            "Chef d'équipe introuvable avec l'identifiant : " + dto.getChefEquipeId()));
            equipe.setChefEquipe(chefEquipe);
        }

        // Update membres (professeurs) if provided
        if (dto.getMembreIds() != null) {
            // Clear existing member relationships first
            if (equipe.getMembres() != null) {
                for (Professeur existingMembre : equipe.getMembres()) {
                    existingMembre.setEquipeDeRechercheAcceuillante(null);
                }
            }
            
            if (!dto.getMembreIds().isEmpty()) {
                List<Professeur> membres = professeurRepository.findAllById(dto.getMembreIds());
                if (membres.size() != dto.getMembreIds().size()) {
                    throw new EntityNotFoundException("Un ou plusieurs professeurs introuvables dans la liste des membres");
                }
                equipe.setMembres(membres);
                
                // Set the team reference for each member
                for (Professeur membre : membres) {
                    membre.setEquipeDeRechercheAcceuillante(equipe);
                }
            } else {
                equipe.setMembres(new ArrayList<>());
            }
        }

        // Update doctorants if provided
        if (dto.getDoctorantIds() != null) {
            // Clear existing doctorant relationships first
            if (equipe.getDoctorants() != null) {
                for (Doctorant existingDoctorant : equipe.getDoctorants()) {
                    existingDoctorant.setEquipeDeRecherche(null);
                }
            }
            
            if (!dto.getDoctorantIds().isEmpty()) {
                List<Doctorant> doctorants = doctorantRepository.findAllById(dto.getDoctorantIds());
                if (doctorants.size() != dto.getDoctorantIds().size()) {
                    throw new EntityNotFoundException("Un ou plusieurs doctorants introuvables dans la liste des doctorants");
                }
                equipe.setDoctorants(doctorants);
                
                // Set the team reference for each doctorant
                for (Doctorant doctorant : doctorants) {
                    doctorant.setEquipeDeRecherche(equipe);
                }
            } else {
                equipe.setDoctorants(new ArrayList<>());
            }
        }

        return equipeMapper.toResponseDTO(equipeRepository.save(equipe));
    }

    // Entity-based methods
    @Override
    public EquipeDeRecherche updateEquipeEntity(EquipeDeRecherche equipe, Long id) {
        if (!equipeRepository.existsById(id)) {
            throw new EntityNotFoundException("Équipe introuvable avec l'identifiant : " + id);
        }
        equipe.setId(id);
        return equipeRepository.save(equipe);
    }

    /* DELETE --------------------------------------------- */
    @Override
    public void deleteEquipe(EquipeDeRecherche equipe) {
        if (!equipeRepository.existsById(equipe.getId())) {
            throw new EntityNotFoundException(
                    "Impossible de supprimer : équipe introuvable avec l'identifiant : " + equipe.getId());
        }

        // Check if equipe has members or doctorants
        if ((equipe.getMembres() != null && !equipe.getMembres().isEmpty()) ||
                (equipe.getDoctorants() != null && !equipe.getDoctorants().isEmpty())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Impossible de supprimer : cette équipe a encore des membres ou des doctorants rattachés.");
        }

        equipeRepository.delete(equipe);
    }

    @Override
    public void deleteEquipeById(Long id) {
        EquipeDeRecherche equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Équipe introuvable avec l'identifiant : " + id));
        deleteEquipe(equipe);
    }

    @Override
    public void deleteAllEquipes() {
        equipeRepository.deleteAll();
    }

    /* GET --------------------------------------------- */
    // DTO-based methods
    @Override
    public EquipeResponseDTO getEquipeById(Long id) {
        EquipeDeRecherche equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Équipe introuvable avec l'identifiant : " + id));
        return equipeMapper.toResponseDTO(equipe);
    }

    @Override
    public List<EquipeResponseDTO> getAllEquipes() {
        return equipeRepository.findAll().stream()
                .map(equipeMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<EquipeResponseDTO> getEquipesByChefEquipeId(Long chefEquipeId) {
        return equipeRepository.findByChefEquipeId(chefEquipeId).stream()
                .map(equipeMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<EquipeResponseDTO> searchEquipesByName(String name) {
        return equipeRepository.findByNomDeLequipeContainingIgnoreCase(name).stream()
                .map(equipeMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Simple DTO methods
    @Override
    public EquipeSimpleDTO getSimple(Long id) {
        EquipeDeRecherche equipe = equipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Équipe introuvable avec l'identifiant : " + id));
        return equipeMapper.toSimpleDTO(equipe);
    }

    @Override
    public List<EquipeSimpleDTO> getAllSimple() {
        return equipeRepository.findAll().stream()
                .map(equipeMapper::toSimpleDTO)
                .collect(Collectors.toList());
    }

    // Entity-based methods
    @Override
    public EquipeDeRecherche getEquipeEntityById(Long id) {
        return equipeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Équipe introuvable avec l'identifiant : " + id));
    }

    @Override
    public List<EquipeDeRecherche> getAllEquipesEntities() {
        return equipeRepository.findAll();
    }

    @Override
    public List<EquipeDeRecherche> getEquipesEntitiesByChefEquipeId(Long chefEquipeId) {
        return equipeRepository.findByChefEquipeId(chefEquipeId);
    }

    /* PAGINATION METHODS --------------------------------------------- */
    @Override
    public Page<EquipeResponseDTO> getAllEquipesPaginated(Pageable pageable) {
        Page<EquipeDeRecherche> equipesPage = equipeRepository.findAll(pageable);
        return equipesPage.map(equipeMapper::toResponseDTO);
    }

    @Override
    public PaginatedResponseDTO<EquipeResponseDTO> findEquipesWithSearchPaginated(
            Pageable pageable, String search) {
        // Use the repository method to get paginated results with search
        Page<EquipeDeRecherche> equipesPage = equipeRepository.findEquipesWithSearch(search, pageable);

        // Convert Page<EquipeDeRecherche> to List<EquipeResponseDTO>
        List<EquipeResponseDTO> content = equipesPage.getContent()
                .stream()
                .map(equipeMapper::toResponseDTO)
                .collect(Collectors.toList());

        // Create and return PaginatedResponseDTO
        return PaginatedMapper.mapToDTO(
                content,
                equipesPage.getNumber(),
                equipesPage.getTotalPages(),
                equipesPage.getTotalElements(),
                equipesPage.getSize(),
                equipesPage.isLast());
    }

    @Override
    public Page<EquipeSimpleDTO> getAllSimplePaginated(Pageable pageable) {
        Page<EquipeDeRecherche> equipesPage = equipeRepository.findAll(pageable);
        return equipesPage.map(equipeMapper::toSimpleDTO);
    }
}
