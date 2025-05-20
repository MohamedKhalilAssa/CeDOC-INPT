package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.*;
import ma.inpt.cedoc.model.DTOs.auth.RegisterRequestDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.*;
import ma.inpt.cedoc.service.utilisateurServices.LieuDeNaissanceService;
import ma.inpt.cedoc.service.utilisateurServices.NationaliteService;

@Component
@RequiredArgsConstructor
public class UtilisateurMapper {

        private final NationaliteService nationaliteService;
        private final LieuDeNaissanceService lieuDeNaissanceService;

        // Mapping UtilisateurRequestDTO → Utilisateur
        public Utilisateur fromRequestDTO(UtilisateurRequestDTO dto) {
                Nationalite nationalite = nationaliteService.findById(dto.getNationaliteId());
                LieuDeNaissance lieu = lieuDeNaissanceService.findById(dto.getLieuDeNaissanceId());

                return Utilisateur.builder()
                        .nom(dto.getNom())
                        .prenom(dto.getPrenom())
                        .email(dto.getEmail())
                        .telephone(dto.getTelephone())
                        .password(dto.getPassword())
                        .dateNaissance(dto.getDateNaissance())
                        .etatCivilEnum(dto.getEtatCivilEnum())
                        .genre(dto.getGenre())
                        .nationalite(nationalite)
                        .lieuDeNaissance(lieu)
                        .emailValider(false)
                        .build();
        }

        // Mapping RegisterRequestDTO → Utilisateur (email + mot de passe seulement)
        public Utilisateur fromRegisterDTO(RegisterRequestDTO dto) {
                return Utilisateur.builder()
                        .email(dto.getEmail())
                        .password(dto.getPassword())
                        .emailValider(false)
                        .build();
        }

        // Mapping Utilisateur → UtilisateurResponseDTO (avec roleNames uniquement)
        public UtilisateurResponseDTO toResponse(Utilisateur utilisateur) {
                return UtilisateurResponseDTO.builder()
                        .id(utilisateur.getId())
                        .createdAt(utilisateur.getCreatedAt())
                        .updatedAt(utilisateur.getUpdatedAt())
                        .nom(utilisateur.getNom())
                        .prenom(utilisateur.getPrenom())
                        .email(utilisateur.getEmail())
                        .telephone(utilisateur.getTelephone())
                        .dateNaissance(utilisateur.getDateNaissance())
                        .etatCivilEnum(utilisateur.getEtatCivilEnum())
                        .genre(utilisateur.getGenre())
                        .emailValider(utilisateur.isEmailValider())
                        .nationalite(mapNationaliteToDTO(utilisateur.getNationalite()))
                        .lieuDeNaissance(mapLieuDeNaissanceToDTO(utilisateur.getLieuDeNaissance()))
                        .roleNames(mapRoleNames(utilisateur.getRoles()))
                        .build();
        }

        // Mapping Utilisateur → UtilisateurResponseDTO (avec roles complets)
        public UtilisateurResponseDTO toResponseWithRoles(Utilisateur utilisateur) {
                return UtilisateurResponseDTO.builder()
                        .id(utilisateur.getId())
                        .createdAt(utilisateur.getCreatedAt())
                        .updatedAt(utilisateur.getUpdatedAt())
                        .nom(utilisateur.getNom())
                        .prenom(utilisateur.getPrenom())
                        .email(utilisateur.getEmail())
                        .telephone(utilisateur.getTelephone())
                        .dateNaissance(utilisateur.getDateNaissance())
                        .etatCivilEnum(utilisateur.getEtatCivilEnum())
                        .genre(utilisateur.getGenre())
                        .emailValider(utilisateur.isEmailValider())
                        .nationalite(mapNationaliteToDTO(utilisateur.getNationalite()))
                        .lieuDeNaissance(mapLieuDeNaissanceToDTO(utilisateur.getLieuDeNaissance()))
                        .roles(mapRolesToDTOs(utilisateur.getRoles()))
                        .build();
        }

        // Helpers
        public List<String> mapRoleNames(List<Role> roles) {
                return roles.stream()
                        .map(Role::getIntitule)
                        .collect(Collectors.toList());
        }

        public List<RoleResponseDTO> mapRolesToDTOs(List<Role> roles) {
                return roles.stream()
                        .map(role -> RoleResponseDTO.builder()
                                .id(role.getId())
                                .intitule(role.getIntitule())
                                .createdAt(role.getCreatedAt())
                                .updatedAt(role.getUpdatedAt())
                                .build())
                        .collect(Collectors.toList());
        }

        public NationaliteResponseDTO mapNationaliteToDTO(Nationalite nationalite) {
                if (nationalite == null) return null;
                return NationaliteResponseDTO.builder()
                        .id(nationalite.getId())
                        .intitule(nationalite.getIntitule())
                        .createdAt(nationalite.getCreatedAt())
                        .updatedAt(nationalite.getUpdatedAt())
                        .build();
        }

        public LieuDeNaissanceResponseDTO mapLieuDeNaissanceToDTO(LieuDeNaissance lieu) {
                if (lieu == null) return null;
                return LieuDeNaissanceResponseDTO.builder()
                        .id(lieu.getId())
                        .pays(lieu.getPays())
                        .ville(lieu.getVille())
                        .build();
        }
}
