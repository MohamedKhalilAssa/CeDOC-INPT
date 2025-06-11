package ma.inpt.cedoc.service.CandidatureSevices;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.*;
import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.CandidatureMapper;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.EquipeMapper;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.SujetMapper;
import ma.inpt.cedoc.model.DTOs.mapper.Global.PaginatedMapper;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.CandidatMapper;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.ProfesseurMapper;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.UtilisateurMapper;
import ma.inpt.cedoc.model.entities.candidature.*;
import ma.inpt.cedoc.model.entities.utilisateurs.*;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;
import ma.inpt.cedoc.model.enums.utilisateur_enums.RoleEnum;
import ma.inpt.cedoc.repositories.candidatureRepositories.*;
import ma.inpt.cedoc.repositories.utilisateursRepositories.*;
import ma.inpt.cedoc.service.Global.FileService;
import ma.inpt.cedoc.service.utilisateurServices.CandidatService;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidatureServiceImpl implements CandidatureService {

    private final CandidatureRepository candidatureRepository;
    private final CandidatRepository candidatRepository;
    private final CandidatureMapper candidatureMapper;

    private final EquipeMapper equipeMapper;
    private final RoleRepository roleRepository;
    private final SujetMapper sujetMapper;

    private final SujetRepository sujetRepository;
    private final EquipeDeRechercheRepository equipeDeRechercheRepository;
    private final ProfesseurRepository professeurRepository;
    private final ProfesseurMapper professeurMapper;

    private final CandidatService candidatService;
    private final CandidatMapper candidatMapper;
    private final ChefEquipeRoleRepository chefEquipeRoleRepository;
    private final DirecteurDeTheseRoleRepository directeurDeTheseRoleRepository;

    private final FileService fileService;
    private final CandidatureAccepterRepository candidatureAccepterRepository;
    private final CandidatureRefuserRepository  candidatureRefuserRepository;


    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper utilisateurMapper;

    /**
     * Date limite de dépôt des candidatures (format ISO-8601).
     * À configurer dans application.properties :
     *   app.date-limite-candidature=2025-06-30
     */
    @Value("${app.date-limite-candidature}")
    private LocalDate dateLimiteCandidature;

    // TO BE FIXED: save entretien date somewhere if needed
    @Override
    @Transactional
    public CandidatureResponseDTO accepterCandidature(Long candidatureId, LocalDate entretien) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Candidature introuvable"));
        
        return transitionToAccepter(candidature, entretien);
    }

    @Override
    @Transactional
    public CandidatureResponseDTO refuserCandidature(Long candidatureId, String motif) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
            .orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Candidature introuvable"));
        
        return transitionToRefuser(candidature, motif);
    }

    @Override
    public void fermerEtArchiverCompteCandidat(Long candidatId) {
        Candidat candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidat introuvable"));

        candidat.setArchiver(true);
        candidatRepository.save(candidat);
        // Tout nettoyage supplémentaire ou suppression après délai peut être adapté ici
    }

    // =====================================================================
    // Création d’une nouvelle candidature
    // =====================================================================
    @Override
    @Transactional
    public CandidatureResponseDTO createCandidature(CandidatureRequestDTO dto, UserDetails userDetails) {
        // 1. Vérifier qu’il n’y a pas déjà de candidature en cours pour cet utilisateur
        Candidat existingCnd = candidatRepository.findByUtilisateurEmail(userDetails.getUsername())
                .orElse(null);
        if (existingCnd != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Vous avez déjà une candidature en cours. Veuillez la modifier plutôt que d'en créer une nouvelle.");
        }

        // 2. Récupérer l'utilisateur authentifié (nouveau candidat)
        Utilisateur utilisateur = utilisateurRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        // 3. Mettre à jour l'utilisateur avec les champs fournis dans le DTO
        // CandidatureRequestDTO extends UtilisateurRequestDTO, donc on peut directement l'utiliser
        utilisateur = utilisateurMapper.UpdateUtilisateurFromRequestDTO(utilisateur, dto);
        
        Role candidatRole = roleRepository.findByIntitule("CANDIDAT")
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Rôle CANDIDAT introuvable"));
        utilisateur.getRoles().add(candidatRole); // Assigner le rôle CANDIDAT
        utilisateurRepository.save(utilisateur);

        // 4. Vérifier la date limite
        if (LocalDate.now().isAfter(dateLimiteCandidature)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date limite de candidature dépassée");
        }

        // 5. Valider le fichier ZIP
        MultipartFile file = dto.getDossierCandidature();
        if (file == null || file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le fichier de candidature est vide.");
        }
        String extension = fileService.getFileExtension(file.getOriginalFilename());
        if (extension == null || !extension.equalsIgnoreCase("zip")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le dossier doit être un fichier .zip");
        }

        // 6. Vérifier le nombre de sujets
        if (dto.getSujetsIds() == null || dto.getSujetsIds().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vous devez sélectionner au moins un sujet");
        }
        if (dto.getSujetsIds().size() > 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Vous ne pouvez sélectionner que 3 sujets au maximum");
        }

        // 7. Sauvegarder le ZIP dans /uploads/candidatures/{utilisateurId}/
        String dossierPath;
        try {
            dossierPath = fileService.storeFile(file, "candidatures/" + utilisateur.getId());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de l’enregistrement du fichier");
        }

        // 8. Créer l’entité Candidat + Candidature
        Candidat nouveauCandidat = Candidat.builder()
                .utilisateur(utilisateur)
                .archiver(false)
                .build();
        // Use repository directly because candidatService.saveCandidat(...) returns DTO
        Candidat savedCandidat = candidatRepository.save(nouveauCandidat);


        Candidature candidature = Candidature.builder()
                .statutCandidature(CandidatureEnum.SOUMISE)
                .mentionBac(dto.getMentionBac())
                .mentionDiplome(dto.getMentionDiplome())
                .dossierCandidature(dossierPath)
                .diplome(dto.getDiplome())
                .typeEtablissement(dto.getTypeEtablissement())
                .specialite(dto.getSpecialite())
                .intitulePFE(dto.getIntitulePFE())
                .candidat(savedCandidat)
                .sujets(null) // on définit ensuite
                .build();

        // 9. Lier les sujets sélectionnés
        List<Sujet> sujetsChoisis = dto.getSujetsIds().stream()
                .map(idSujet -> sujetRepository.findById(idSujet)
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Sujet introuvable : " + idSujet)))
                .collect(Collectors.toList());
        candidature.setSujets(sujetsChoisis);

        // 10. Sauvegarder la candidature
        Candidature saved = candidatureRepository.save(candidature);
        // 11. Retourner le DTO
        return candidatureMapper.toResponseDTO(saved);
    }

    @Override
    public List<EquipeSimpleDTO> getAllEquipes() {
        return equipeDeRechercheRepository.findAll().stream()
                .map(equipeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<SujetResponseDTO> getAllPublicSujets() {
        return sujetRepository.findAll().stream()
                .filter(Sujet::isEstPublic)
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProfesseurResponseDTO> getProfesseursByEquipeId(Long equipeId) {
        return professeurRepository.findAll().stream()
                .filter(p -> p.getEquipeDeRechercheAcceuillante() != null
                        && p.getEquipeDeRechercheAcceuillante().getId().equals(equipeId))
                .map(professeurMapper::toSimpleDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<SujetResponseDTO> getSujetsByEquipeId(Long equipeId) {
        return sujetRepository.findByChefEquipeId(equipeId).stream()
                .map(sujetMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // =====================================================================
    // Consultation pour le chef d’équipe (si besoin)
    // =====================================================================
    @Override
    public List<CandidatureResponseDTO> getCandidaturesByChefEquipeId(Long chefEquipeId) {
        List<Candidature> candidatures = candidatureRepository.findAll().stream()
                .filter(cand -> cand.getSujets().stream()
                        .anyMatch(sujet -> sujet.getChefEquipe().getId().equals(chefEquipeId)))
                .collect(Collectors.toList());
        
        // Extract IDs and use safe loading
        List<Long> candidatureIds = candidatures.stream().map(Candidature::getId).collect(Collectors.toList());
        List<Candidature> safelyLoadedCandidatures = candidatureRepository.findByIdInWithMinimalLoading(candidatureIds);
        
        return safelyLoadedCandidatures.stream()
                .map(candidatureMapper::toResponseDTOSafe)
                .collect(Collectors.toList());
    }

    @Override
    public void propositionSujet(Long professeurId, Long sujetId) {
        Professeur professeur = professeurRepository.findById(professeurId)
                                .orElseThrow(() -> new ResponseStatusException(404, "Professeur introuvable", null));

        Sujet sujet = sujetRepository.findById(sujetId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Sujet introuvable"));

        sujet.getProfesseurs().add(professeur);
        sujetRepository.save(sujet);
    }

    @Override
    public CandidatResponseDTO registerCandidat(CandidatRequestDTO dto) {
        Candidat candidat = candidatMapper.toEntity(dto);
        return candidatService.saveCandidat(candidat);
    }

    // =====================================================================
    // Archiver les candidats refusés il y a ≥ 1 mois (tâche planifiée)
    // =====================================================================
    @Override
    @Scheduled(cron = "0 30 0 * * ?") // Tous les jours à 00:30
    @Transactional
    public void archiverCandidatsRefuses() {
        LocalDate oneMonthAgo = LocalDate.now().minusMonths(1);
        // Filtrer sur createdAt ou dateRefus si vous l’ajoutez à l’entité
        List<Candidature> refusesAnciens = candidatureRefuserRepository
                .findByStatutCandidatureAndDateRefusBefore(CandidatureEnum.REFUSER, oneMonthAgo);

        for (Candidature c : refusesAnciens) {
            Long candidatId = c.getCandidat().getId();
            candidatService.archiverCandidat(candidatId);
        }
    }

    // =====================================================================
    // Basculer automatiquement SOUMISE → EN_COURS_DE_TRAITEMENT
    // =====================================================================
    @Override
    @Scheduled(cron = "0 0 0 * * ?") // Tous les jours à minuit
    @Transactional
    public void basculerStatutEnCoursTraitement() {
        List<Candidature> soumises = candidatureRepository
                .findByStatutCandidatureAndCreatedAtBefore(
                        CandidatureEnum.SOUMISE,
                        dateLimiteCandidature);
        for (Candidature c : soumises) {
            c.setStatutCandidature(CandidatureEnum.EN_COURS_DE_TRAITEMENT);
        }
        candidatureRepository.saveAll(soumises);
    }

    // =====================================================================
    // Suivi du statut de la candidature par le candidat
    // =====================================================================
    @Override
    public List<CandidatureResponseDTO> getMyCandidatures(UserDetails userDetails) {
        Candidat candidat = candidatService.findFullCandidatByEmail(userDetails.getUsername());
        List<Candidature> list = candidatureRepository.findByCandidat(candidat);
        
        // Extract IDs and use safe loading
        List<Long> candidatureIds = list.stream().map(Candidature::getId).collect(Collectors.toList());
        List<Candidature> safelyLoadedCandidatures = candidatureRepository.findByIdInWithMinimalLoading(candidatureIds);
        
        return safelyLoadedCandidatures.stream()
                .map(candidatureMapper::toResponseDTOSafe)
                .collect(Collectors.toList());
    }

    // =====================================================================
    // Modification d’une candidature avant la date limite
    // =====================================================================
    @Override
    @Transactional
    public CandidatureResponseDTO updateCandidature(Long candidatureId, CandidatureRequestDTO dto,
            UserDetails userDetails) {
        Candidature existing = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable"));

        // Vérifier que l’email du propriétaire correspond à l’utilisateur authentifié
        if (!existing.getCandidat().getUtilisateur().getEmail().equals(userDetails.getUsername())) {
            throw new AccessDeniedException("Accès refusé : vous n’êtes pas le propriétaire de cette candidature.");
        }

        // Vérifier la date limite
        if (LocalDate.now().isAfter(dateLimiteCandidature)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Date limite de candidature dépassée. Impossible de modifier.");
        }

        // Mettre à jour les champs modifiables
        existing.setMentionBac(dto.getMentionBac());
        existing.setMentionDiplome(dto.getMentionDiplome());
        existing.setTypeEtablissement(dto.getTypeEtablissement());
        existing.setSpecialite(dto.getSpecialite());
        existing.setIntitulePFE(dto.getIntitulePFE());

        // Remplacement du fichier ZIP si nécessaire
        MultipartFile nouveauFichier = dto.getDossierCandidature();
        if (nouveauFichier != null && !nouveauFichier.isEmpty()) {
            try {
                fileService.deleteFile(existing.getDossierCandidature());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Erreur lors de la suppression de l’ancien dossier de candidature", e);
            }

            String extension = fileService.getFileExtension(nouveauFichier.getOriginalFilename());
            if (extension == null || !extension.equalsIgnoreCase("zip")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le dossier doit être un fichier .zip");
            }

            String newPath;
            try {
                newPath = fileService.storeFile(nouveauFichier, "candidatures/" + existing.getCandidat().getId());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Erreur lors de l’enregistrement du nouveau fichier de candidature", e);
            }
            existing.setDossierCandidature(newPath);
        }

        // Mise à jour des sujets si fournis
        if (dto.getSujetsIds() != null && !dto.getSujetsIds().isEmpty()) {
            List<Sujet> nouveauxSujets = dto.getSujetsIds().stream()
                    .map(idSujet -> sujetRepository.findById(idSujet)
                            .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND, "Sujet introuvable : " + idSujet)))
                    .collect(Collectors.toList());
            existing.setSujets(nouveauxSujets);
        }

        Candidature updated = candidatureRepository.save(existing);
        return candidatureMapper.toResponseDTO(updated);
    }

    @Override
    public CandidatureResponseDTO getCandidatureById(Long candidatureId, UserDetails userDetails) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable"));

        String emailConnecte = userDetails.getUsername();
        if (!candidature.getCandidat().getUtilisateur().getEmail().equals(emailConnecte)) {
            throw new AccessDeniedException("Accès refusé : vous ne pouvez consulter que vos propres candidatures.");
        }

        return candidatureMapper.toResponseDTO(candidature);
    }

    @Override
    public void deleteCandidature(Long candidatureId, UserDetails userDetails) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable"));

        String emailConnecte = userDetails.getUsername();
        if (!candidature.getCandidat().getUtilisateur().getEmail().equals(emailConnecte)) {
            throw new AccessDeniedException("Accès refusé : vous ne pouvez supprimer que vos propres candidatures.");
        }

        String cheminFichier = candidature.getDossierCandidature();
        if (cheminFichier != null && !cheminFichier.isBlank()) {
            try {
                fileService.deleteFile(cheminFichier);
            } catch (IOException e) {
                // Ignorer l’erreur, continuer la suppression en base
            }
        }

        candidatureRepository.delete(candidature);
    }

    @Override
    public List<Candidature> findByChefEquipeRoleId(Long chefRoleId) {
        // 1) Extraire tous les sujets validés par ce chef
        List<Sujet> sujets = sujetRepository.findByChefEquipeId(chefRoleId);
        // 2) Filtrer les candidatures qui contiennent l’un de ces sujets
        return candidatureRepository.findAll().stream()
            .filter(c -> c.getSujets().stream().anyMatch(sujets::contains))
            .collect(Collectors.toList());
    }

    @Override
    public List<Candidature> findByProfesseurId(Long professeurId) {
        // 1) Extraire tous les sujets où ce professeur apparaît
        List<Sujet> sujets = sujetRepository.findByProfesseursId(professeurId);
        // 2) Filtrer les candidatures qui contiennent l’un de ces sujets
        return candidatureRepository.findAll().stream()
            .filter(c -> c.getSujets().stream().anyMatch(sujets::contains))
            .collect(Collectors.toList());
    }


    @Override
    public PaginatedResponseDTO<CandidatureResponseDTO> getAccessibleCandidatures(UserDetails userDetails, Pageable pageable, String search) {
        Utilisateur user = utilisateurRepository
            .findByEmail(userDetails.getUsername())
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        Long userId = user.getId();

        List<Candidature> allAllowed;
        
        // DIRECTION_CEDOC sees ALL candidatures
        if (user.hasRole(RoleEnum.DIRECTION_CEDOC)) {
            allAllowed = candidatureRepository.findAllWithMinimalLoading();
        } else {
            // For other roles, collect candidature IDs based on their specific roles
            Set<Long> candidatureIds = new HashSet<>();
            boolean hasValidRole = false;
            
            // Check if user is chef equipe
            if (user.hasRole(RoleEnum.CHEF_EQUIPE)) {
                hasValidRole = true;
                ChefEquipeRole chefRole = chefEquipeRoleRepository.findByProfesseurUtilisateurId(userId).orElse(null);
                if (chefRole != null) {
                    List<Sujet> sujetsAsChef = sujetRepository.findByChefEquipeId(chefRole.getId());
                    for (Sujet sujet : sujetsAsChef) {
                        List<Candidature> sujetCandidatures = candidatureRepository.findBySujetsContaining(sujet);
                        candidatureIds.addAll(sujetCandidatures.stream().map(Candidature::getId).collect(Collectors.toSet()));
                    }
                }
            }
            
            // Check if user is professeur
            if (user.hasRole(RoleEnum.PROFESSEUR)) {
                hasValidRole = true;
                Professeur professeur = professeurRepository.findByUtilisateurId(userId).orElse(null);
                if (professeur != null) {
                    List<Sujet> sujetsAsProfesseur = sujetRepository.findByProfesseursId(professeur.getId());
                    for (Sujet sujet : sujetsAsProfesseur) {
                        List<Candidature> sujetCandidatures = candidatureRepository.findBySujetsContaining(sujet);
                        candidatureIds.addAll(sujetCandidatures.stream().map(Candidature::getId).collect(Collectors.toSet()));
                    }
                }
            }
            
            // Check if user is directeur de these
            if (user.hasRole(RoleEnum.DIRECTEUR_DE_THESE)) {
                hasValidRole = true;
                DirecteurDeTheseRole directeurRole = directeurDeTheseRoleRepository.findByProfesseurUtilisateurId(userId).orElse(null);
                if (directeurRole != null) {
                    List<Sujet> sujetsAsDirecteur = sujetRepository.findByDirecteurDeTheseId(directeurRole.getId());
                    for (Sujet sujet : sujetsAsDirecteur) {
                        List<Candidature> sujetCandidatures = candidatureRepository.findBySujetsContaining(sujet);
                        candidatureIds.addAll(sujetCandidatures.stream().map(Candidature::getId).collect(Collectors.toSet()));
                    }
                }
            }
            if (user.hasRole(RoleEnum.CANDIDAT)) {
                hasValidRole = true;
                Candidat candidat = candidatRepository.findByUtilisateurId(userId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST,"Candidat introuvable"));
                List<Candidature> cnds = candidatureRepository.findByCandidat(candidat);
                candidatureIds.addAll(cnds.stream().map(Candidature::getId).collect(Collectors.toSet()));
            }
            // If user doesn't have any valid role, throw access denied
            if (!hasValidRole) {
                throw new AccessDeniedException("Accès non autorisé");
            }
            
            // Load the candidatures safely using the collected IDs
            allAllowed = candidatureRepository.findByIdInWithMinimalLoading(new ArrayList<>(candidatureIds));
        }

        // Apply search filter if provided
        if (search != null && !search.trim().isEmpty()) {
            String searchLower = search.toLowerCase().trim();
            allAllowed = allAllowed.stream()
                .filter(candidature -> 
                    candidature.getCandidat().getUtilisateur().getNom().toLowerCase().contains(searchLower) ||
                    candidature.getCandidat().getUtilisateur().getPrenom().toLowerCase().contains(searchLower) ||
                    candidature.getCandidat().getUtilisateur().getEmail().toLowerCase().contains(searchLower) ||
                    candidature.getStatutCandidature().toString().toLowerCase().contains(searchLower) ||
                    candidature.getSpecialite().toLowerCase().contains(searchLower))
                .collect(Collectors.toList());
        }

        // Apply sorting
        if (pageable.getSort().isSorted()) {
            allAllowed = allAllowed.stream()
                .sorted((c1, c2) -> {
                    for (Sort.Order order : pageable.getSort()) {
                        int comparison = compareByField(c1, c2, order.getProperty());
                        if (comparison != 0) {
                            return order.isAscending() ? comparison : -comparison;
                        }
                    }
                    return 0;
                })
                .collect(Collectors.toList());
        }

        // Manually slice into a Page:
        int start = (int)pageable.getOffset();
        int end = Math.min(start + pageable.getPageSize(), allAllowed.size());
        List<Candidature> sub = allAllowed.subList(start, end);
        
        // Convert to DTOs using safe mapping method (entities are already safely loaded)
        List<CandidatureResponseDTO> content = sub.stream()
            .map(candidatureMapper::toResponseDTOSafe)
            .collect(Collectors.toList());

        // Create and return PaginatedResponseDTO
        return PaginatedMapper.mapToDTO(
            content,
            pageable.getPageNumber(),
            (int) Math.ceil((double) allAllowed.size() / pageable.getPageSize()),
            allAllowed.size(),
            pageable.getPageSize(),
            start + pageable.getPageSize() >= allAllowed.size()
        );
    }

    private int compareByField(Candidature c1, Candidature c2, String field) {
        switch (field) {
            case "candidatNom":
                return c1.getCandidat().getUtilisateur().getNom().compareToIgnoreCase(
                    c2.getCandidat().getUtilisateur().getNom());
            case "candidatPrenom":
                return c1.getCandidat().getUtilisateur().getPrenom().compareToIgnoreCase(
                    c2.getCandidat().getUtilisateur().getPrenom());
            case "candidatEmail":
                return c1.getCandidat().getUtilisateur().getEmail().compareToIgnoreCase(
                    c2.getCandidat().getUtilisateur().getEmail());
            case "statutCandidature":
                return c1.getStatutCandidature().toString().compareToIgnoreCase(
                    c2.getStatutCandidature().toString());
            case "specialite":
                return c1.getSpecialite().compareToIgnoreCase(c2.getSpecialite());
            case "createdAt":
                return c1.getCreatedAt().compareTo(c2.getCreatedAt());
            case "updatedAt":
                return c1.getUpdatedAt().compareTo(c2.getUpdatedAt());
            case "id":
            default:
                return c1.getId().compareTo(c2.getId());
        }
    }

    @Override
    @Transactional
    public CandidatureResponseDTO changeStatutCandidature(Long candidatureId, ChangeStatutCandidatureRequestDTO dto, UserDetails userDetails) {
        // 1. Load the candidature
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable"));

        // 2. Get current user and verify authorization
        Utilisateur currentUser = utilisateurRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        if (!canChangeStatutCandidature(currentUser, candidature)) {
            throw new AccessDeniedException("Vous n'avez pas l'autorisation de modifier le statut de cette candidature");
        }

        // 3. Handle status change based on target status
        CandidatureEnum currentStatus = candidature.getStatutCandidature();
        CandidatureEnum newStatus = dto.getNouveauStatut();
        
        // If status is not changing, just return current candidature
        if (currentStatus == newStatus) {
            return candidatureMapper.toResponseDTO(candidature);
        }
        if(currentStatus == CandidatureEnum.REFUSER || newStatus == CandidatureEnum.ACCEPTER) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                "Impossible de changer le statut d'une candidature déjà refusée ou dejà acceptée");
        }

        switch (newStatus) {
            case ACCEPTER:
                if (dto.getDateEntretien() == null || dto.getDateEntretien().isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "La date d'entretien est obligatoire pour accepter une candidature");
                }
                try {
                    LocalDate entretienDate = LocalDate.parse(dto.getDateEntretien());
                    return transitionToAccepter(candidature, entretienDate);
                } catch (DateTimeParseException e) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "Format de date invalide. Utilisez le format yyyy-MM-dd (ex: 2025-06-10). Date reçue: " + dto.getDateEntretien());
                } catch (Exception e) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "Erreur lors du traitement de la date d'entretien: " + e.getMessage());
                }

            case REFUSER:
                if (dto.getMotif() == null || dto.getMotif().trim().isEmpty()) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, 
                        "Le motif de refus est obligatoire");
                }
                return transitionToRefuser(candidature, dto.getMotif().trim());

            case EN_COURS_DE_TRAITEMENT:
            case SOUMISE:
                return transitionToSimpleStatus(candidature, newStatus);

            default:
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Statut invalide");
        }
    }

    /**
     * Transition any candidature to ACCEPTER status
     */
    private CandidatureResponseDTO transitionToAccepter(Candidature currentCandidature, LocalDate entretienDate) {
        // 1. Update the base candidature status
        currentCandidature.setStatutCandidature(CandidatureEnum.ACCEPTER);
        candidatureRepository.save(currentCandidature);
        
        // 2. Remove from CandidatureRefuser table if it exists
        candidatureRefuserRepository.findById(currentCandidature.getId()).ifPresent(refuser -> {
            candidatureRefuserRepository.delete(refuser);
        });
        
        // 3. Create or update in CandidatureAccepter table
        CandidatureAccepter accepter = candidatureAccepterRepository.findById(currentCandidature.getId())
            .orElse(new CandidatureAccepter());
        
        // Copy all fields from base candidature
        copyAllFields(currentCandidature, accepter);
        accepter.setDateEntretien((int) entretienDate.toEpochDay());
        
        CandidatureAccepter saved = candidatureAccepterRepository.save(accepter);
        return candidatureMapper.toResponseDTO(saved);
    }

    /**
     * Transition any candidature to REFUSER status
     */
    private CandidatureResponseDTO transitionToRefuser(Candidature currentCandidature, String motif) {
        // 1. Update the base candidature status
        currentCandidature.setStatutCandidature(CandidatureEnum.REFUSER);
        candidatureRepository.save(currentCandidature);
        
        // 2. Remove from CandidatureAccepter table if it exists
        candidatureAccepterRepository.findById(currentCandidature.getId()).ifPresent(accepter -> {
            candidatureAccepterRepository.delete(accepter);
        });
        
        // 3. Create or update in CandidatureRefuser table
        CandidatureRefuser refuser = candidatureRefuserRepository.findById(currentCandidature.getId())
            .orElse(new CandidatureRefuser());
        
        // Copy all fields from base candidature
        copyAllFields(currentCandidature, refuser);
        refuser.setMotif(motif);
        
        CandidatureRefuser saved = candidatureRefuserRepository.save(refuser);
        return candidatureMapper.toResponseDTO(saved);
    }

    /**
     * Transition any candidature to a simple status (SOUMISE, EN_COURS_DE_TRAITEMENT)
     */
    private CandidatureResponseDTO transitionToSimpleStatus(Candidature currentCandidature, CandidatureEnum newStatus) {
        // 1. Update the base candidature status
        currentCandidature.setStatutCandidature(newStatus);
        candidatureRepository.save(currentCandidature);
        
        // 2. Remove from both subclass tables
        candidatureAccepterRepository.findById(currentCandidature.getId()).ifPresent(accepter -> {
            candidatureAccepterRepository.delete(accepter);
        });
        candidatureRefuserRepository.findById(currentCandidature.getId()).ifPresent(refuser -> {
            candidatureRefuserRepository.delete(refuser);
        });
        
        // 3. Return the updated base candidature
        return candidatureMapper.toResponseDTO(currentCandidature);
    }

    /**
     * Copy all fields including ID for subclass entities
     */
    private void copyAllFields(Candidature source, Candidature target) {
        target.setId(source.getId()); // Keep the same ID for subclass
        target.setCreatedAt(source.getCreatedAt());
        target.setUpdatedAt(source.getUpdatedAt());
        target.setStatutCandidature(source.getStatutCandidature());
        target.setMentionBac(source.getMentionBac());
        target.setDiplome(source.getDiplome());
        target.setMentionDiplome(source.getMentionDiplome());
        target.setDossierCandidature(source.getDossierCandidature());
        target.setTypeEtablissement(source.getTypeEtablissement());
        target.setSpecialite(source.getSpecialite());
        target.setIntitulePFE(source.getIntitulePFE());
        target.setCandidat(source.getCandidat());
        target.setSujets(source.getSujets());
    }

    /**
     * Check if the current user can change the status of the given candidature
     */
    private boolean canChangeStatutCandidature(Utilisateur currentUser, Candidature candidature) {
        // DIRECTION_CEDOC can change any candidature status
        if (currentUser.hasRole(RoleEnum.DIRECTION_CEDOC)) {
            return true;
        }

        Long userId = currentUser.getId();

        // Check if user is chef equipe for any of the candidature's sujets
        if (currentUser.hasRole(RoleEnum.CHEF_EQUIPE)) {
            ChefEquipeRole chefRole = chefEquipeRoleRepository.findByProfesseurUtilisateurId(userId).orElse(null);
            if (chefRole != null) {
                boolean isChefForSujet = candidature.getSujets().stream()
                    .anyMatch(sujet -> sujet.getChefEquipe() != null && 
                             sujet.getChefEquipe().getId().equals(chefRole.getId()));
                if (isChefForSujet) {
                    return true;
                }
            }
        }

        // Check if user is professeur for any of the candidature's sujets
        if (currentUser.hasRole(RoleEnum.PROFESSEUR)) {
            Professeur professeur = professeurRepository.findByUtilisateurId(userId).orElse(null);
            if (professeur != null) {
                boolean isProfesseurForSujet = candidature.getSujets().stream()
                    .anyMatch(sujet -> sujet.getProfesseurs().contains(professeur));
                if (isProfesseurForSujet) {
                    return true;
                }
            }
        }

        // Check if user is directeur de these for any of the candidature's sujets
        if (currentUser.hasRole(RoleEnum.DIRECTEUR_DE_THESE)) {
            DirecteurDeTheseRole directeurRole = directeurDeTheseRoleRepository.findByProfesseurUtilisateurId(userId).orElse(null);
            if (directeurRole != null) {
                boolean isDirecteurForSujet = candidature.getSujets().stream()
                    .anyMatch(sujet -> sujet.getDirecteurDeThese() != null &&
                             sujet.getDirecteurDeThese().getId().equals(directeurRole.getId()));
                if (isDirecteurForSujet) {
                    return true;
                }
            }
        }

        return false;
    }

}
