package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.CandidatureRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.CandidatureMapper;
import ma.inpt.cedoc.model.entities.candidature.Candidature;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.entities.utilisateurs.LieuDeNaissance;
import ma.inpt.cedoc.model.entities.utilisateurs.Nationalite;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;
import ma.inpt.cedoc.service.utilisateurServices.LieuDeNaissanceService;
import ma.inpt.cedoc.service.utilisateurServices.NationaliteService;

@Component
@RequiredArgsConstructor
public class CandidatMapperImpl implements CandidatMapper {

    private final CandidatureMapper candidatureMapper;
    private final NationaliteService nationaliteService;
    private final LieuDeNaissanceService lieuDeNaissanceService;

    public Candidat toEntity(CandidatRequestDTO dto) {
        // Forcer le statut de candidature
        CandidatureRequestDTO candidatureDTO = dto.getCandidature();
        candidatureDTO.setStatutCandidature(CandidatureEnum.SOUMISE);

        Candidature candidature = candidatureMapper.toEntity(candidatureDTO);

        // Mapper les entités liées (relations ManyToOne)
        Nationalite nationalite = nationaliteService.getNationaliteEntityById(dto.getNationaliteId());
        LieuDeNaissance lieu = lieuDeNaissanceService.findById(dto.getLieuDeNaissanceId());

        // Création de l’objet candidat
        Candidat candidat = Candidat.builder()
                .email(dto.getEmail())
                .password(dto.getPassword())
                .genre(dto.getGenre())
                .etatCivilEnum(dto.getEtatCivilEnum())
                .nom(dto.getNom())
                .prenom(dto.getPrenom())
                .nationalite(nationalite)
                .lieuDeNaissance(lieu)
                .telephone(dto.getTelephone())
                .dateNaissance(dto.getDateNaissance())
                .archiver(false)
                .build();

        // Liaison bidirectionnelle
        candidature.setCandidat(candidat);
        candidat.setCandidature(candidature);

        return candidat;
    }
}
