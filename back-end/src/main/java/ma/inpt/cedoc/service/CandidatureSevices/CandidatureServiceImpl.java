package ma.inpt.cedoc.service.CandidatureSevices;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.UtilisateurRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.EquipeSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.CandidatureMapper;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.EquipeMapper;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.SujetMapper;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.CandidatMapper;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.ProfesseurMapper;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.UtilisateurMapper;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;
import ma.inpt.cedoc.repositories.candidatureRepositories.CandidatureRefuserRepository;
import ma.inpt.cedoc.repositories.candidatureRepositories.CandidatureRepository;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.model.enums.roles_enum.RoleEnum;
import ma.inpt.cedoc.repositories.utilisateursRepositories.*;
import ma.inpt.cedoc.service.Global.EmailService;
import ma.inpt.cedoc.service.Global.FileService;
import ma.inpt.cedoc.service.utilisateurServices.CandidatService;

@Service
@RequiredArgsConstructor
@Transactional
public class CandidatureServiceImpl implements CandidatureService {

    private final CandidatureRepository candidatureRepository;
    private final CandidatureRefuserRepository candidatureRefuserRepository;
    private final CandidatRepository candidatRepository;
    private final CandidatureMapper candidatureMapper;

    private final EquipeMapper equipeMapper;
    private final SujetMapper sujetMapper;

    private final SujetRepository sujetRepository;
    private final EquipeDeRechercheRepository equipeDeRechercheRepository;
    private final ProfesseurRepository professeurRepository;
    private final ProfesseurMapper professeurMapper;

    private final CandidatService candidatService;
    private final CandidatMapper candidatMapper;
    private final ChefEquipeRoleRepository chefEquipeRoleRepository;

    private final FileService fileService;
    private final EmailService emailService;

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
    public CandidatureResponseDTO accepterCandidature(Long candidatureId, LocalDate entretien) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable"));

        candidature.setStatutCandidature(CandidatureEnum.ACCEPTER);
        // TODO: save entretien date into candidature if entity has a field for it
        Candidature saved = candidatureRepository.save(candidature);
        return candidatureMapper.toResponseDTO(saved);
    }

    @Override
    public CandidatureResponseDTO refuserCandidature(Long candidatureId, String motif) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Candidature introuvable"));

        candidature.setStatutCandidature(CandidatureEnum.REFUSER);
        // TODO: if you add a "motifRefus" field on Candidature, set it here
        Candidature saved = candidatureRepository.save(candidature);
        return candidatureMapper.toResponseDTO(saved);
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

        // 2. Récupérer l’utilisateur authentifié (nouveau candidat)
        Utilisateur utilisateur = utilisateurRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

        // 3. Mettre à jour l’utilisateur si des champs UtilisateurRequestDTO sont fournis dans le DTO
        if (dto instanceof UtilisateurRequestDTO) {
            UtilisateurRequestDTO utilisateurRequestDTO = (UtilisateurRequestDTO) dto;
            utilisateur = utilisateurMapper.UpdateUtilisateurFromRequestDTO(utilisateur, utilisateurRequestDTO);
            utilisateurRepository.save(utilisateur);
        }

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
        return candidatureRepository.findAll().stream()
                .filter(cand -> cand.getSujets().stream()
                        .anyMatch(sujet -> sujet.getChefEquipe().getId().equals(chefEquipeId)))
                .map(candidatureMapper::toResponseDTO)
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
        return list.stream()
                .map(candidatureMapper::toResponseDTO)
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
    public List<Candidature> getAccessibleCandidatures(Utilisateur utilisateur) {
        Long userId = utilisateur.getId();

        if (utilisateur.hasRole(RoleEnum.CHEF_EQUIPE)) {
            Long chefRoleId = chefEquipeRoleRepository.findByProfesseurUtilisateurId(userId)
                    .orElseThrow(() -> new RuntimeException("Pas de rôle chef trouvé"))
                    .getId();
            return findByChefEquipeRoleId(chefRoleId);

        } else if (utilisateur.hasRole(RoleEnum.PROFESSEUR)) {
            return findByProfesseurId(userId);

        } else {
            throw new AccessDeniedException("Accès non autorisé");
        }
    }
}
