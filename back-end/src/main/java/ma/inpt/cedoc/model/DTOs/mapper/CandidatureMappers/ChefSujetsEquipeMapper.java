package ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import ma.inpt.cedoc.model.DTOs.Candidature.ChefSujetsEquipeResponseDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.simpleDTOs.UtilisateurResponseDTO;
import ma.inpt.cedoc.model.entities.candidature.Sujet;

@Component
public class ChefSujetsEquipeMapper {

    /**
     * Convertit une liste de Map (résultat de getPublicSujetsAvecParticipants)
     * en List<ChefSujetsEquipeResponseDTO>
     */
    public List<ChefSujetsEquipeResponseDTO> mapFromController(List<Map<String, Object>> controllerData) {
        return controllerData.stream()
                .map(this::mapSingleSujet)
                .collect(Collectors.toList());
    }

    /**
     * Convertit directement une liste de Sujet entities en
     * List<ChefSujetsEquipeResponseDTO>
     */
    public List<ChefSujetsEquipeResponseDTO> mapFromSujetEntities(List<Sujet> sujets) {
        return sujets.stream()
                .map(this::mapFromSujetEntity)
                .collect(Collectors.toList());
    }

    private ChefSujetsEquipeResponseDTO mapSingleSujet(Map<String, Object> data) {
        // Extraction des données de la Map
        Sujet sujetEntity = (Sujet) data.get("sujet");
        UtilisateurResponseDTO chef = (UtilisateurResponseDTO) data.get("chef");

        // Construction du nom complet du chef
        String nomCompletChef = chef != null ? chef.getPrenom() + " " + chef.getNom() : null;

        // Extraction du nom de l'équipe
        String equipeIntitule = extractEquipeIntitule(sujetEntity);

        return ChefSujetsEquipeResponseDTO.builder()
                .intituleSujet(sujetEntity.getIntitule())
                .nomCompletChef(nomCompletChef)
                .equipeIntitule(equipeIntitule)
                .build();
    }

    private ChefSujetsEquipeResponseDTO mapFromSujetEntity(Sujet sujet) {
        // Construction du nom complet du chef
        String nomCompletChef = extractNomCompletChef(sujet);

        // Extraction du nom de l'équipe
        String equipeIntitule = extractEquipeIntitule(sujet);

        return ChefSujetsEquipeResponseDTO.builder()
                .intituleSujet(sujet.getIntitule())
                .nomCompletChef(nomCompletChef)
                .equipeId(
                        extractEquipeId(sujet))
                .equipeIntitule(equipeIntitule)
                .build();
    }

    private String extractNomCompletChef(Sujet sujet) {
        if (sujet == null || sujet.getChefEquipe() == null ||
                sujet.getChefEquipe().getProfesseur() == null ||
                sujet.getChefEquipe().getProfesseur().getUtilisateur() == null) {
            return null;
        }

        var utilisateur = sujet.getChefEquipe().getProfesseur().getUtilisateur();
        return utilisateur.getPrenom() + " " + utilisateur.getNom();
    }

    private String extractEquipeIntitule(Sujet sujet) {
        if (sujet == null || sujet.getChefEquipe() == null ||
                sujet.getChefEquipe().getEquipeDeRecherche() == null) {
            return null;
        }

        return sujet.getChefEquipe().getEquipeDeRecherche().getNomDeLequipe();
    }

    private Long extractEquipeId(Sujet sujet) {
        if (sujet == null || sujet.getChefEquipe() == null ||
                sujet.getChefEquipe().getEquipeDeRecherche() == null) {
            return null;
        }

        return sujet.getChefEquipe().getEquipeDeRecherche().getId();
    }
}
