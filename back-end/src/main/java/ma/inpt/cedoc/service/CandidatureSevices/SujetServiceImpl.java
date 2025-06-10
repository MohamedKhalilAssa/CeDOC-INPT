package ma.inpt.cedoc.service.CandidatureSevices;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.ChefSujetsEquipeResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.ChefSujetsEquipeMapper;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.SujetMapper;
import ma.inpt.cedoc.model.DTOs.mapper.Global.PaginatedMapper;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipeRole;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.ChefEquipeRoleRepository;
import ma.inpt.cedoc.service.utilisateurServices.DirecteurDeTheseService;
import ma.inpt.cedoc.service.utilisateurServices.ProfesseurService;
import ma.inpt.cedoc.service.utilisateurServices.UtilisateurService;

@Service
@RequiredArgsConstructor
@Transactional
public class SujetServiceImpl implements SujetService {
    private final ProfesseurService professeurService;

    private final SujetRepository sujetRepository;
    private final ChefEquipeRoleRepository chefEquipeRoleRepository;
    private final SujetMapper sujetMapper;
    private final ChefSujetsEquipeMapper chefSujetsEquipeMapper;
    private final DirecteurDeTheseService directeurDeTheseService;
    private final UtilisateurService utilisateurService;

    /* CREATE --------------------------------------------- */
    // DTO-based methods

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

    // Entity-based methods
    @Override
    public Sujet saveSujetEntity(Sujet sujet) {
        return sujetRepository.save(sujet);
    }

    @Override
    public List<Sujet> saveSujetsEntities(List<Sujet> sujets) {
        return sujetRepository.saveAll(sujets);
    } /* UPDATE --------------------------------------------- */
    // DTO-based methods @Override

    public SujetResponseDTO updateSujet(SujetRequestDTO dto, Long id) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        Sujet toUpdate = sujetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + id));

        // Check permissions before updating
        if (!canModifySubject(toUpdate, currentUserEmail)) {
            throw new AccessDeniedException("Vous n'avez pas l'autorisation de modifier ce sujet");
        }

        Sujet sujet = sujetMapper.updateFromRequestDTO(toUpdate, dto);

        return sujetMapper.toResponseDTO(sujetRepository.save(sujet));
    }

    // Entity-based methods
    @Override
    public Sujet updateSujetEntity(Sujet sujet, Long id) {
        if (!sujetRepository.existsById(id)) {
            throw new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + id);
        }
        sujet.setId(id);
        return sujetRepository.save(sujet);
    } /* DELETE --------------------------------------------- */

    @Override
    public void deleteSujet(Sujet sujet) {
        if (!sujetRepository.existsById(sujet.getId())) {
            throw new EntityNotFoundException(
                    "Impossible de supprimer : sujet introuvable avec l'identifiant : " + sujet.getId());
        }
        sujetRepository.delete(sujet);
    }

    @Override
    public void deleteSujetById(Long id) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

        Sujet sujet = sujetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + id));

        // Check permissions before deleting
        if (!canModifySubject(sujet, currentUserEmail)) {
            throw new AccessDeniedException("Vous n'avez pas l'autorisation de supprimer ce sujet");
        }

        sujetRepository.deleteById(id);
    }

    @Override
    public void deleteAllSujets() {
        sujetRepository.deleteAll();
    }

    /* GET --------------------------------------------- */
    // DTO-based methods
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
            throw new EntityNotFoundException(
                    "Aucun sujet trouvé pour le doctorant avec l'identifiant : " + doctorantId);
        }
        return sujetMapper.toResponseDTO(sujet);
    }

    @Override
    public List<SujetResponseDTO> getAllPublicSujets() {
        return sujetRepository.findAll().stream()
                .filter(Sujet::isEstPublic)
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Entity-based methods
    @Override
    public Sujet getSujetEntityById(Long id) {
        return sujetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + id));
    }

    @Override
    public List<Sujet> getAllSujetsEntities() {
        return sujetRepository.findAll();
    }

    @Override
    public List<Sujet> getSujetsEntitiesByChefEquipeId(Long chefEquipeId) {
        return sujetRepository.findByChefEquipeId(chefEquipeId);
    }

    @Override
    public List<Sujet> getSujetsEntitiesByProfesseurId(Long professeurId) {
        return sujetRepository.findByProfesseursId(professeurId);
    }

    @Override
    public List<Sujet> getSujetsEntitiesByDirecteurDeTheseId(Long directeurDeTheseId) {
        return sujetRepository.findByDirecteurDeTheseId(directeurDeTheseId);
    }

    @Override
    public Sujet getSujetEntityByDoctorantId(Long doctorantId) {
        Sujet sujet = sujetRepository.findByDoctorantsId(doctorantId);
        if (sujet == null) {
            throw new EntityNotFoundException(
                    "Aucun sujet trouvé pour le doctorant avec l'identifiant : " + doctorantId);
        }
        return sujet;
    }

    @Override
    public List<Sujet> getAllPublicSujetsEntities() {
        return sujetRepository.findByEstPublic(true);
    }

    @Override
    public SujetResponseDTO proposerSujet(SujetRequestDTO dto) {
        // Récupération de l'entité Sujet depuis le DTO
        Sujet sujet = sujetMapper.toEntity(dto);

        // Get current authenticated user
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        Professeur currentProfesseur = professeurService.getProfesseurByEmail(currentUserEmail);

        // Ensure professeurs list is mutable and not null
        List<Professeur> professeurs = sujet.getProfesseurs();
        if (professeurs == null) {
            professeurs = new ArrayList<>();
            sujet.setProfesseurs(professeurs);
        } else {
            // Create a new mutable list to avoid potential UnsupportedOperationException
            professeurs = new ArrayList<>(professeurs);
            sujet.setProfesseurs(professeurs);
        }

        // remove current professor if already in the list
        if (professeurs.contains(currentProfesseur)) {
            professeurs.remove(currentProfesseur);
        }

        DirecteurDeTheseRole directeurDeThese = currentProfesseur.getDirecteurDeTheseRole();
        if (directeurDeThese == null) {
            directeurDeThese = directeurDeTheseService.createDirecteurDeTheseWithProfesseur(currentProfesseur);
        }
        sujet.setDirecteurDeThese(directeurDeThese);
        directeurDeThese.getSujets().add(sujet);

        // Sécurité : vérifier que les professeurs ont une équipe
        for (Professeur professeur : professeurs) {
            if (professeur.getEquipeDeRechercheAcceuillante() == null) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                        "Pr. " + professeur.getUtilisateur().getPrenom()
                                + " n'appartient à aucune équipe.");
            }
        }

        // TODO: Implémenter la logique pour gérer plusieurs chefs d'équipes
        // Actuellement, on ne supporte qu'un seul chefEquipe pour simplification
        // temporaire
        // sujet.setChefsEquipes(déduits des équipes des profs);
        // sujet.setChefsAyantValide(new ArrayList<>());

        ChefEquipeRole chefEquipe = currentProfesseur.getEquipeDeRechercheAcceuillante()
                .getChefEquipe();

        if (chefEquipe == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "L'équipe actuelle n'a pas de chef d'équipe associé.");
        }
        sujet.setChefEquipe(chefEquipe);

        // Le sujet est invisible jusqu'à validation (future logique)
        sujet.setValide(false);
        sujet.setEstPublic(false);

        // Persistance
        Sujet saved = sujetRepository.save(sujet);
        return sujetMapper.toResponseDTO(saved);
    }

    /* SIMPLE DTO METHODS --------------------------------------------- */
    @Override
    public SujetResponseSimpleDTO getSimple(Long id) {
        Sujet sujet = sujetRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Sujet non trouvé"));
        return sujetMapper.toSimpleResponseDTO(sujet);
    }

    @Override
    @Transactional
    public List<SujetResponseSimpleDTO> getAllSimple() {
        System.out.println("Fetching all simple sujets");
        return sujetRepository.findAll().stream()
                .map(sujetMapper::toSimpleResponseDTO)
                .collect(Collectors.toList());
    }

    /* PAGINATION METHODS --------------------------------------------- */
    @Override
    public Page<SujetResponseDTO> getAllSujetsPaginated(Pageable pageable) {
        Page<Sujet> sujetsPage = sujetRepository.findAll(pageable);
        return sujetsPage.map(sujetMapper::toResponseDTO);
    }

    @Override
    public Page<SujetResponseDTO> getAllPublicSujetsPaginated(Pageable pageable) {
        // First get all sujets, then filter public ones
        Page<Sujet> publicSujets = sujetRepository.findByEstPublic(true, pageable);

        return publicSujets.map(sujetMapper::toResponseDTO);

    }

    @Override
    public Page<SujetResponseSimpleDTO> getAllSimplePaginated(Pageable pageable) {
        Page<Sujet> sujetsPage = sujetRepository.findAll(pageable);
        return sujetsPage.map(sujetMapper::toSimpleResponseDTO);
    }

    @Override
    public PaginatedResponseDTO<ChefSujetsEquipeResponseDTO> findPublicValideSujetsWithSearchPaginated(
            Pageable pageable, String search) {
        // Use the repository method to get paginated results with search
        Page<Sujet> sujetsPage = sujetRepository.findPublicValideSujetsWithSearch(search, pageable);

        // Convert Page<Sujet> to List<ChefSujetsEquipeResponseDTO>
        List<ChefSujetsEquipeResponseDTO> content = chefSujetsEquipeMapper
                .mapFromSujetEntities(sujetsPage.getContent());

        // Create and return PaginatedResponseDTO
        return PaginatedMapper.mapToDTO(
                content,
                sujetsPage.getNumber(),
                sujetsPage.getTotalPages(),
                sujetsPage.getTotalElements(),
                sujetsPage.getSize(),
                sujetsPage.isLast());
    }

    @Override
    public SujetResponseDTO createSujetByChefEquipe(SujetRequestDTO dto, Long chefEquipeId) {
        // Récupérer le chef d'équipe par son ID
        ChefEquipeRole chefEquipe = chefEquipeRoleRepository.findById(chefEquipeId)
                .orElseThrow(() -> new EntityNotFoundException(
                        "Chef d'équipe introuvable avec l'identifiant : " + chefEquipeId));
        DirecteurDeTheseRole directeurDeThese = chefEquipe.getProfesseur().getDirecteurDeTheseRole();
        if (directeurDeThese == null) {
            directeurDeThese = directeurDeTheseService.createDirecteurDeTheseWithProfesseur(chefEquipe.getProfesseur());
        }

        // Créer l'entité Sujet depuis le DTO
        Sujet sujet = sujetMapper.toEntity(dto);

        // Assigner le chef d'équipe au sujet
        sujet.setChefEquipe(chefEquipe);
        sujet.setDirecteurDeThese(directeurDeThese);

        // Marquer le sujet comme validé et public automatiquement (privilège chef
        // d'équipe)
        sujet.setValide(true);
        sujet.setEstPublic(true);

        // Sauvegarder le sujet
        Sujet savedSujet = sujetRepository.save(sujet); // Retourner le DTO de réponse
        return sujetMapper.toResponseDTO(savedSujet);
    }

    @Override
    public PaginatedResponseDTO<SujetResponseDTO> getMesSujetsPaginated(String userEmail, Pageable pageable,
            String search) {
        try {
            Professeur currentProfesseur = professeurService.getProfesseurByEmail(userEmail);
            if (currentProfesseur == null) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Professeur introuvable");
            }

            Set<Long> sujetIds = new HashSet<>();

            // 1. Get subjects where user is a collaborating professor
            sujetIds.addAll(sujetRepository.findByProfesseursId(currentProfesseur.getId())
                    .stream().map(Sujet::getId).collect(Collectors.toSet()));

            // 2. Get subjects where user is directeur de these
            if (currentProfesseur.isDirecteurDeThese() && currentProfesseur.getDirecteurDeTheseRole() != null) {
                sujetIds.addAll(
                        sujetRepository.findByDirecteurDeTheseId(currentProfesseur.getDirecteurDeTheseRole().getId())
                                .stream().map(Sujet::getId).collect(Collectors.toSet()));
            }

            if (sujetIds.isEmpty()) {
                Page<SujetResponseDTO> emptyPage = Page.empty(pageable);
                return PaginatedMapper.mapToDTO(emptyPage);
            }

            // Get paginated results with search
            Page<Sujet> sujetsPage = sujetRepository.findByIdInWithSearch(new ArrayList<>(sujetIds), search, pageable);

            // Convert to DTOs
            Page<SujetResponseDTO> sujetsDTOPage = sujetsPage.map(sujetMapper::toResponseDTO);

            return PaginatedMapper.mapToDTO(sujetsDTOPage);

        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la récupération des sujets: " + e.getMessage());
        }
    }

    /* PERMISSION HELPER METHODS */

    /**
     * Checks if the current user can modify (update/delete) the given subject
     */
    private boolean canModifySubject(Sujet sujet, String userEmail) {
        try {
            // Check if user has DIRECTION_CEDOC role
            Utilisateur currentUser = utilisateurService.getFullUtilisateurByEmail(userEmail);
            boolean hasDirectionRole = currentUser.getRoles().stream()
                    .anyMatch(role -> "DIRECTION_CEDOC".equals(role.getIntitule()));

            if (hasDirectionRole) {
                return true; // DIRECTION_CEDOC can modify any subject
            }

            Professeur currentProfesseur = professeurService.getProfesseurByEmail(userEmail);
            if (currentProfesseur == null) {
                return false;
            }

            // Check if user is the directeur de these of this subject
            if (sujet.getDirecteurDeThese() != null &&
                    currentProfesseur.isDirecteurDeThese() &&
                    currentProfesseur.getDirecteurDeTheseRole() != null &&
                    sujet.getDirecteurDeThese().getId().equals(currentProfesseur.getDirecteurDeTheseRole().getId())) {
                return true;
            }

            // Check if user is a collaborating professor on this subject
            boolean isCollaboratingProfessor = sujet.getProfesseurs().stream()
                    .anyMatch(prof -> prof.getId().equals(currentProfesseur.getId()));
            if (isCollaboratingProfessor) {
                return true;
            }

            // Check if user is chef d'equipe and subject belongs to team member
            if (currentProfesseur.isChefEquipe() && currentProfesseur.getChefEquipeRole() != null) {
                ChefEquipeRole chefEquipeRole = currentProfesseur.getChefEquipeRole();
                // Check if subject's directeur de these is in the team
                if (sujet.getDirecteurDeThese() != null) {
                    Professeur directeurProfesseur = sujet.getDirecteurDeThese().getProfesseur();
                    if (chefEquipeRole.getEquipeDeRecherche().getMembres().contains(directeurProfesseur)) {
                        return true;
                    }
                }

                // Check if any collaborating professor is in the team
                for (Professeur prof : sujet.getProfesseurs()) {
                    if (chefEquipeRole.getEquipeDeRecherche().getMembres().contains(prof)) {
                        return true;
                    }
                }
            }

            return false;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public PaginatedResponseDTO<SujetResponseDTO> findSujetsByCurrentUserPaginated(Pageable pageable, String search,
            String userEmail) {
        try {
            // Get current user's professor entity
            Professeur currentProfesseur = professeurService.getProfesseurByEmail(userEmail);

            // Collect all subject IDs that belong to this user
            List<Long> userSujetIds = new ArrayList<>();

            // 1. Subjects where user is a participating professor
            List<Sujet> professorSujets = sujetRepository.findByProfesseursId(currentProfesseur.getId());
            userSujetIds.addAll(professorSujets.stream().map(Sujet::getId).collect(Collectors.toList()));

            // 2. Subjects where user is directeur de these
            if (currentProfesseur.isDirecteurDeThese() && currentProfesseur.getDirecteurDeTheseRole() != null) {
                List<Sujet> directeurSujets = sujetRepository
                        .findByDirecteurDeTheseId(currentProfesseur.getDirecteurDeTheseRole().getId());
                userSujetIds.addAll(directeurSujets.stream().map(Sujet::getId).collect(Collectors.toList()));
            }

            // 3. Subjects where user is chef d'equipe
            if (currentProfesseur.isChefEquipe() && currentProfesseur.getChefEquipeRole() != null) {
                List<Sujet> chefSujets = sujetRepository
                        .findByChefEquipeId(currentProfesseur.getChefEquipeRole().getId());
                userSujetIds.addAll(chefSujets.stream().map(Sujet::getId).collect(Collectors.toList()));
            }

            // Remove duplicates
            userSujetIds = userSujetIds.stream().distinct().collect(Collectors.toList());

            if (userSujetIds.isEmpty()) {
                Page<SujetResponseDTO> emptyPage = Page.empty(pageable);
                return PaginatedMapper.mapToDTO(emptyPage);
            }

            // Search with pagination
            Page<Sujet> sujetsPage = sujetRepository.findByIdInWithSearch(userSujetIds, search, pageable);

            // Convert to DTOs
            Page<SujetResponseDTO> sujetsDTOPage = sujetsPage.map(sujetMapper::toResponseDTO);

            return PaginatedMapper.mapToDTO(sujetsDTOPage);

        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la récupération des sujets de l'utilisateur : " + e.getMessage());
        }
    }

    @Override
    public boolean canModifyOrDeleteSujet(Long sujetId, String userEmail) {
        try {
            Sujet sujet = sujetRepository.findById(sujetId)
                    .orElseThrow(
                            () -> new EntityNotFoundException("Sujet introuvable avec l'identifiant : " + sujetId));

            Professeur currentProfesseur = professeurService.getProfesseurByEmail(userEmail);

            // Check if user has DIRECTION_CEDOC role
            if (currentProfesseur.getUtilisateur().getRoles().stream()
                    .anyMatch(role -> "DIRECTION_CEDOC".equals(role.getIntitule()))) {
                return true;
            }

            // Check if user is the subject creator (participating professor)
            if (sujet.getProfesseurs().contains(currentProfesseur)) {
                return true;
            }

            // Check if user is directeur de these for this subject
            if (sujet.getDirecteurDeThese() != null &&
                    currentProfesseur.isDirecteurDeThese() &&
                    currentProfesseur.getDirecteurDeTheseRole() != null &&
                    sujet.getDirecteurDeThese().getId().equals(currentProfesseur.getDirecteurDeTheseRole().getId())) {
                return true;
            }

            // Check if user is chef d'equipe and subject belongs to team member
            if (currentProfesseur.isChefEquipe() && currentProfesseur.getChefEquipeRole() != null) {
                ChefEquipeRole chefRole = currentProfesseur.getChefEquipeRole();

                // Check if subject's chef equipe is the current user
                if (sujet.getChefEquipe() != null && sujet.getChefEquipe().getId().equals(chefRole.getId())) {
                    return true;
                }

                // Check if subject belongs to a team member
                if (chefRole.getEquipeDeRecherche() != null && chefRole.getEquipeDeRecherche().getMembres() != null) {
                    List<Long> teamMemberIds = chefRole.getEquipeDeRecherche().getMembres().stream()
                            .map(Professeur::getId)
                            .collect(Collectors.toList());

                    // Check if any subject professor is a team member
                    boolean belongsToTeamMember = sujet.getProfesseurs().stream()
                            .anyMatch(prof -> teamMemberIds.contains(prof.getId()));

                    if (belongsToTeamMember) {
                        return true;
                    }

                    // Check if directeur de these is a team member
                    if (sujet.getDirecteurDeThese() != null && sujet.getDirecteurDeThese().getProfesseur() != null) {
                        if (teamMemberIds.contains(sujet.getDirecteurDeThese().getProfesseur().getId())) {
                            return true;
                        }
                    }
                }
            }

            return false;

        } catch (Exception e) {
            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de la vérification des permissions : " + e.getMessage());
        }
    }
}
