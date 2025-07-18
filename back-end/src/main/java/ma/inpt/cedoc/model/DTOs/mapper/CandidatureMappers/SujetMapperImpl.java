package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import java.util.List;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetRequestDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseDTO;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetResponseSimpleDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.service.utilisateurServices.ProfesseurService;

@Component
@RequiredArgsConstructor
public class SujetMapperImpl implements SujetMapper {

        private final ProfesseurService professeurService;

        @Override
        public Sujet toEntity(SujetRequestDTO dto) {

                // Récupérer les professeurs qui proposent le sujet
                List<Professeur> professeurs = professeurService.findAllByIds(dto.getProfesseursIds());

                // Construire le sujet (non public tant que non validé par le chef d'équipe)
                return Sujet.builder()
                                .intitule(dto.getIntitule())
                                .description(dto.getDescription())
                                .valide(false) // Validation par le chef d'équipe attendue
                                .estPublic(false) // Affichage public seulement après validation
                                .professeurs(professeurs)
                                .build();
        }

        @Override
        public Sujet updateFromRequestDTO(Sujet sujet, SujetRequestDTO dto) {
                sujet.setIntitule(dto.getIntitule());
                sujet.setDescription(dto.getDescription());
                sujet.setValide(dto.isValide());
                sujet.setEstPublic(dto.isEstPublic());
                return sujet;
        }

        @Override
        public SujetResponseDTO toResponseDTO(Sujet sujet) {
                List<ProfesseurResponseDTO> professeurs = sujet.getProfesseurs().stream()
                                .map(p -> ProfesseurResponseDTO.builder()
                                                .id(p.getId())
                                                .nom(p.getUtilisateur().getNom())
                                                .prenom(p.getUtilisateur().getPrenom())
                                                .email(p.getUtilisateur().getEmail())
                                                .telephone(p.getUtilisateur().getTelephone())
                                                .grade(p.getGrade())
                                                .build())
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
                                                .id(sujet.getChefEquipe().getProfesseur().getId())
                                                .nom(sujet.getChefEquipe().getProfesseur().getUtilisateur().getNom())
                                                .prenom(sujet.getChefEquipe().getProfesseur().getUtilisateur()
                                                                .getPrenom())
                                                .email(sujet.getChefEquipe().getProfesseur().getUtilisateur()
                                                                .getEmail())
                                                .build())
                                .directeurDeThese(sujet.getDirecteurDeThese() != null ? UtilisateurResponseDTO.builder()
                                                .id(sujet.getDirecteurDeThese().getProfesseur().getId())
                                                .nom(sujet.getDirecteurDeThese().getProfesseur().getUtilisateur()
                                                                .getNom())
                                                .prenom(sujet.getDirecteurDeThese().getProfesseur().getUtilisateur()
                                                                .getPrenom())
                                                .email(sujet.getDirecteurDeThese().getProfesseur().getUtilisateur()
                                                                .getEmail())
                                                .build() : null)
                                .professeurs(professeurs)
                                .build();
        }

        @Override
        public SujetResponseSimpleDTO toSimpleResponseDTO(Sujet sujet) {
                List<Long> professeurIds = sujet.getProfesseurs().stream()
                                .map(p -> p.getId())
                                .collect(java.util.stream.Collectors.toList());

                return SujetResponseSimpleDTO.builder()
                                .id(sujet.getId())
                                .intitule(sujet.getIntitule())
                                .description(sujet.getDescription())
                                .valide(sujet.isValide())
                                .estPublic(sujet.isEstPublic())
                                .createdAt(sujet.getCreatedAt())
                                .updatedAt(sujet.getUpdatedAt())
                                .chefEquipe(sujet.getChefEquipe().getProfesseur().getId())
                                .directeurDeThese(sujet.getDirecteurDeThese() != null
                                                ? sujet.getDirecteurDeThese().getProfesseur().getId()
                                                : null)
                                .professeurs(professeurIds)
                                .build();
        }
}
