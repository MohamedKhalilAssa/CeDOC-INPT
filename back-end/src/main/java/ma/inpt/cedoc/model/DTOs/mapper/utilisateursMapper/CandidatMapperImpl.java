package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.utilisateurs.*;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;
import ma.inpt.cedoc.service.utilisateurServices.LieuDeNaissanceService;
import ma.inpt.cedoc.service.utilisateurServices.NationaliteService;

@Component
@RequiredArgsConstructor
public class CandidatMapperImpl implements CandidatMapper {

    private final NationaliteService nationaliteService;
    private final LieuDeNaissanceService lieuDeNaissanceService;

    public Candidat toEntity(CandidatRequestDTO dto) {
        // Create a basic candidature entity without using the mapper to avoid circular dependency
        CandidatureRequestDTO candidatureDTO = dto.getCandidature();
        candidatureDTO.setStatutCandidature(CandidatureEnum.SOUMISE);

        // Build candidature manually to break circular dependency
        Candidature candidature = Candidature.builder()
                .statutCandidature(CandidatureEnum.SOUMISE)
                .candidat(null) // Will be set below in bidirectional relationship
                .build();

        // Mapper les entités liées (relations ManyToOne)
        Nationalite nationalite = nationaliteService.getNationaliteEntityById(dto.getNationaliteId());
        LieuDeNaissance lieu = lieuDeNaissanceService.findById(dto.getLieuDeNaissanceId());

        // Création de l'utilisateur
        Utilisateur utilisateur = Utilisateur.builder()
                .email(dto.getEmail())
                .genre(dto.getGenre())
                .etatCivilEnum(dto.getEtatCivilEnum())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .nationalite(nationalite)
                .lieuDeNaissance(lieu)
                .telephone(dto.getTelephone())
                .dateNaissance(dto.getDateNaissance())
                .emailValider(false)
                .build();

        // Création de l'objet candidat avec composition
        Candidat candidat = Candidat.builder()
                .utilisateur(utilisateur)
                .archiver(false)
                .build();

        // Liaison bidirectionnelle
        candidature.setCandidat(candidat);
        candidat.setCandidature(candidature);

        return candidat;
    }

    @Override
    public Candidat FromUtilisateurToCandidat(Utilisateur utilisateur) {
        // Check if the user already has a candidat association
        if (utilisateur.getCandidat() != null) {
            return utilisateur.getCandidat();
        }
        
        // Create a new candidat using the composition pattern
        return Candidat.builder()
                .utilisateur(utilisateur)
                .archiver(false)
                .build();
    }
}
