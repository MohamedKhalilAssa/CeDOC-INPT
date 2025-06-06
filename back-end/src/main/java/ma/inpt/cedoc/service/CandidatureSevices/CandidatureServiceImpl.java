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

    private final FileService fileService;
    private final EmailService emailService;

    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper utilisateurMapper;

    @Override
    public CandidatureResponseDTO accepterCandidature(Long candidatureId, LocalDate entretien) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(404, "Candidature introuvable", null));

        candidature.setStatutCandidature(CandidatureEnum.ACCEPTER);
        return candidatureMapper.toResponseDTO(candidatureRepository.save(candidature));
    }

    @Override
    public CandidatureResponseDTO refuserCandidature(Long candidatureId, String motif) {
        Candidature candidature = candidatureRepository.findById(candidatureId)
                .orElseThrow(() -> new ResponseStatusException(404, "Candidature introuvable", null));

        candidature.setStatutCandidature(CandidatureEnum.REFUSER);
        // Le champ "motif" peut être ajouté dans l’entité si besoin
        return candidatureMapper.toResponseDTO(candidatureRepository.save(candidature));
    }

    @Override
    public void fermerEtArchiverCompteCandidat(Long candidatId) {
        Candidat candidat = candidatRepository.findById(candidatId)
                .orElseThrow(() -> new ResponseStatusException(404, "Candidat introuvable", null));

        candidat.setArchiver(true);
        candidatRepository.save(candidat);
        // suppression après délai (automatisée par tâche cron ou batch)
    }

    /**
     * Date limite de dépôt des candidatures (format ISO-8601).
     * À configurer dans application.properties :
     * app.date-limite-candidature=2025-06-30
     */
    @Value("${app.date-limite-candidature}")
    private LocalDate dateLimiteCandidature;

    // LOCATION DE STOCKAGE 

    // =====================================================================
    // Création d’une nouvelle candidature
    // =====================================================================
    @Override
    @Transactional
    public CandidatureResponseDTO createCandidature(CandidatureRequestDTO dto, UserDetails userDetails) {
        // 0. CHECK
        Candidat cnd = candidatRepository.findByUtilisateurEmail(userDetails.getUsername()).orElse(null);
        if (cnd != null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Vous avez déjà une candidature en cours. Veuillez la modifier plutôt que d'en créer une nouvelle.");
        }        
        // 1. Récupérer le candidat à partir de l'email authentifié modifier si necessaire
        Utilisateur newCandidat = utilisateurRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur introuvable"));

                // TAKE INTO CONSIDERATION THE CHANGES ON POSTULER
        UtilisateurRequestDTO utilisateurRequestDTO = (UtilisateurRequestDTO) dto;
        newCandidat = utilisateurMapper.UpdateUtilisateurFromRequestDTO(newCandidat, utilisateurRequestDTO);
        utilisateurRepository.save(newCandidat);
        // 2. Vérifier la date limite
        if (LocalDate.now().isAfter(dateLimiteCandidature)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Date limite de candidature dépassée");
        }

        // 3. Valider le fichier zip
        MultipartFile file = dto.getDossierCandidature();
        if (file.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le fichier de candidature est vide.");
        }
        String extension = fileService.getFileExtension(file.getOriginalFilename());
        if (extension == null || !extension.equalsIgnoreCase("zip")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le dossier doit être un fichier .zip");
        }

        // 4. Vérifier le nombre de sujets transmis
        if (dto.getSujetsIds() == null || dto.getSujetsIds().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vous devez sélectionner au moins un sujet");
        }
        if (dto.getSujetsIds().size() > 3) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Vous ne pouvez sélectionner que 3 sujets au maximum");
        }

        // 5. Stocker le fichier dans uploads/candidatures/{candidatId}/
        String dossierPath;
        try {
            dossierPath = fileService.storeFile(
                    file,
                    "candidatures/" + newCandidat.getId());
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                    "Erreur lors de l’enregistrement du fichier");
        }

        // 6. Enregister le nouveau candidat puis Construire l’entité Candidature

        Candidat savedCnd = Candidat.builder()
                .utilisateur(newCandidat)
                .archiver(false) // par défaut, le candidat n'est pas archivé
                .build();
        candidatService.saveCandidat(savedCnd);
        Candidature candidature = Candidature.builder()
                .statutCandidature(CandidatureEnum.SOUMISE) // statut forcé
                .mentionBac(dto.getMentionBac())
                .mentionDiplome(dto.getMentionDiplome())
                .dossierCandidature(dossierPath)
                .diplome(dto.getDiplome())
                .typeEtablissement(dto.getTypeEtablissement())
                .specialite(dto.getSpecialite())
                .intitulePFE(dto.getIntitulePFE())
                .candidat(savedCnd)
                .sujets(null) // on gère la relation sujets juste après
                .build();

        // 7. Lier les sujets sélectionnés
        List<Sujet> sujetsChoisis = dto.getSujetsIds().stream()
                .map(idSujet -> sujetRepository.findById(idSujet)
                        .orElseThrow(() -> new ResponseStatusException(
                                HttpStatus.NOT_FOUND, "Sujet introuvable : " + idSujet)))
                .collect(Collectors.toList());
        candidature.setSujets(sujetsChoisis);

        // 8. Sauvegarder la candidature
        Candidature saved = candidatureRepository.save(candidature);

        // 9. Retourner le DTO
        return candidatureMapper.toResponseDTO(saved);
    }

    @Override
    public List<EquipeSimpleDTO> getAllEquipes() {
        return equipeDeRechercheRepository.findAll()
                .stream()
                .map(equipeMapper::toDto)
                .toList();
    }

    @Override
    public List<SujetResponseDTO> getAllPublicSujets() {
        return sujetRepository.findAll().stream()
                .filter(Sujet::isEstPublic)
                .map(sujetMapper::toResponseDTO)
                .toList();
    }

    @Override
    public List<ProfesseurResponseDTO> getProfesseursByEquipeId(Long equipeId) {
        return professeurRepository.findAll().stream()
                .filter(p -> p.getEquipeDeRechercheAcceuillante() != null
                        && p.getEquipeDeRechercheAcceuillante().getId().equals(equipeId))
                .map(professeurMapper::toSimpleDTO)
                .toList();
    }

    @Override
    public List<SujetResponseDTO> getSujetsByEquipeId(Long equipeId) {
        return sujetRepository.findByChefEquipeId(equipeId).stream()
                .map(sujetMapper::toResponseDTO)
                .toList();
    }

    // =====================================================================
    // Consultation pour le chef d’équipe (si besoin)
    // =====================================================================
    @Override
    public List<CandidatureResponseDTO> getCandidaturesByChefEquipeId(Long chefEquipeId) {
        // Suppose que ChefEquipeService offre une méthode pour récupérer la liste de
        // tous les sujets d’une équipe.
        // Ensuite on cherche dans candidatureRepository toutes les candidatures qui
        // contiennent un sujet de cette équipe.
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
                .orElseThrow(() -> new ResponseStatusException(404, "Sujet introuvable", null));

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
        // On récupère toutes les candidatures refusées avant oneMonthAgo
        List<Candidature> refusesAnciens = candidatureRefuserRepository
                .findByStatutCandidatureAndDateRefusBefore(CandidatureEnum.REFUSER, oneMonthAgo);

        for (Candidature c : refusesAnciens) {
            Long candidatId = c.getCandidat().getId();
            // On archive le candidat
            candidatService.archiverCandidat(candidatId);
        }
    }

    // =====================================================================
    // Basculer automatiquement SOUMISE → EN_COURS_DE_TRAITEMENT
    // (tâche planifiée à minuit chaque jour)
    // =====================================================================
    @Override
    @Scheduled(cron = "0 0 0 * * ?") // Tous les jours à minuit
    @Transactional
    public void basculerStatutEnCoursTraitement() {
        // On bascule toutes les candidatures créées avant ou à la date limite et qui
        // restent en SOUMISE
        List<Candidature> soumises = candidatureRepository.findByStatutCandidatureAndCreatedAtBefore(
                CandidatureEnum.SOUMISE, dateLimiteCandidature.atStartOfDay().toLocalDate());
        for (Candidature c : soumises) {
            c.setStatutCandidature(CandidatureEnum.EN_COURS_DE_TRAITEMENT);
        }
        candidatureRepository.saveAll(soumises);
    }

    // =====================================================================
    // Consultation / Suivi du statut de la candidature par le candidat
    // =====================================================================
    @Override
    public List<CandidatureResponseDTO> getMyCandidatures(UserDetails userDetails) {
        // 1. Récupérer le candidat à partir de l’email (UserDetails)
        Candidat candidat = candidatService.findFullCandidatByEmail(userDetails.getUsername());
        // 2. Récupérer toutes les candidatures
        List<Candidature> list = candidatureRepository.findByCandidat(candidat);
        // 3. Convertir en DTO
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

        // 1. Vérifier le propriétaire
        if (!existing.getCandidat().getUtilisateur().getEmail().equals(userDetails.getUsername())) {
            throw new AccessDeniedException("Accès refusé : vous n’êtes pas le propriétaire de cette candidature.");
        }

        // 2. Vérifier la date limite
        if (LocalDate.now().isAfter(dateLimiteCandidature)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,
                    "Date limite de candidature dépassée. Impossible de modifier.");
        }

        // 3. Mettre à jour les champs modifiables :
        existing.setMentionBac(dto.getMentionBac());
        existing.setMentionDiplome(dto.getMentionDiplome());
        existing.setTypeEtablissement(dto.getTypeEtablissement());
        existing.setSpecialite(dto.getSpecialite());
        existing.setIntitulePFE(dto.getIntitulePFE());

        // 4. Si le candidat envoie un nouveau fichier, remplacer l’ancien
        MultipartFile nouveauFichier = dto.getDossierCandidature();
        if (nouveauFichier != null && !nouveauFichier.isEmpty()) {
            // 4.a) Supprimer l’ancien fichier (on capture IOException)
            try {
                fileService.deleteFile(existing.getDossierCandidature());
            } catch (IOException e) {
                // On transforme en ResponseStatusException 500 pour que Spring renvoie HTTP 500
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Erreur lors de la suppression de l’ancien dossier de candidature", e);
            }

            // 4.b) Valider l’extension du nouveau fichier
            String extension = fileService.getFileExtension(nouveauFichier.getOriginalFilename());
            if (extension == null || !extension.equalsIgnoreCase("zip")) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Le dossier doit être un fichier .zip");
            }

            // 4.c) Stocker le nouveau fichier (on capture également IOException)
            String newPath;
            try {
                newPath = fileService.storeFile(nouveauFichier, "candidatures/" + existing.getCandidat().getId());
            } catch (IOException e) {
                throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,
                        "Erreur lors de l’enregistrement du nouveau fichier de candidature", e);
            }
            existing.setDossierCandidature(newPath);
        }

        // 5. Mettre à jour la liste des sujets si fourni
        if (dto.getSujetsIds() != null && !dto.getSujetsIds().isEmpty()) {
            List<Sujet> nouveauxSujets = dto.getSujetsIds().stream()
                    .map(idSujet -> sujetRepository.findById(idSujet)
                            .orElseThrow(() -> new ResponseStatusException(
                                    HttpStatus.NOT_FOUND, "Sujet introuvable : " + idSujet)))
                    .collect(Collectors.toList());
            existing.setSujets(nouveauxSujets);
        }

        // 6. Sauvegarder
        Candidature updated = candidatureRepository.save(existing);
        return candidatureMapper.toResponseDTO(updated);
    }
}
