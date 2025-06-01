package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeThese;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.service.utilisateurServices.ChefEquipeService;
import ma.inpt.cedoc.service.utilisateurServices.DirecteurDeTheseService;
import ma.inpt.cedoc.service.utilisateurServices.ProfesseurService;

@Component
@RequiredArgsConstructor
public class SujetMapperImpl implements SujetMapper {

    private final ProfesseurService professeurService;
    private final ChefEquipeService chefEquipeService;
    private final DirecteurDeTheseService directeurDeTheseService;

    public Sujet toEntity(SujetRequestDTO dto) {
        // Récupérer le chef d'équipe
        ChefEquipe chefEquipe = chefEquipeService.findById(dto.getChefEquipeId());

        // Récupérer le directeur de thèse (facultatif)
        DirecteurDeThese directeur = null;
        if (dto.getDirecteurDeTheseId() != null) {
            directeur = directeurDeTheseService.findById(dto.getDirecteurDeTheseId());
        }

        // Récupérer les professeurs qui proposent le sujet
        List<Professeur> professeurs = professeurService.findAllByIds(dto.getProfesseursIds());

        // Construire le sujet (non public tant que non validé par le chef d'équipe)
        return Sujet.builder()
                .intitule(dto.getIntitule())
                .description(dto.getDescription())
                .valide(false)       // Validation par le chef d’équipe attendue
                .estPublic(false)    // Affichage public seulement après validation
                .chefEquipe(chefEquipe)
                .directeurDeThese(directeur)
                .professeurs(professeurs)
                .build();
    }

    @Override
    public SujetResponseDTO toResponseDTO(Sujet sujet) {
        List<ProfesseurResponseDTO> professeurs = sujet.getProfesseurs().stream()
            .map(p -> ProfesseurResponseDTO.builder()
                .id(p.getId())
                .nom(p.getNom())
                .prenom(p.getPrenom())
                .email(p.getEmail())
                .grade(p.getGrade().name())
                .build()
            )
            .collect(java.util.stream.Collectors.toList());


            return SujetResponseDTO.builder()
                                    .id(sujet.getId())
                                    .intitule(sujet.getIntitule())
                                    .description(sujet.getDescription())
                                    .valide(sujet.isValide())
                                    .estPublic(sujet.isEstPublic())
                                    .createdAt(sujet.getCreatedAt())
                                    .updatedAt(sujet.getUpdatedAt())
                                    .chefEquipe(UtilisateurResponseDTO.builder()
                                        .id(sujet.getChefEquipe().getId())
                                        .nom(sujet.getChefEquipe().getNom())
                                        .prenom(sujet.getChefEquipe().getPrenom())
                                        .email(sujet.getChefEquipe().getEmail())
                                        .build())
                                    .directeurDeThese(sujet.getDirecteurDeThese() != null ?
                                        UtilisateurResponseDTO.builder()
                                            .id(sujet.getDirecteurDeThese().getId())
                                            .nom(sujet.getDirecteurDeThese().getNom())
                                            .prenom(sujet.getDirecteurDeThese().getPrenom())
                                            .email(sujet.getDirecteurDeThese().getEmail())
                                            .build() : null)
                                    .professeurs(professeurs)
                                    .build();
    
    }
}
