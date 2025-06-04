package ma.inpt.cedoc.web.Utilisateurs;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Candidature.SujetEquipeDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.ChefSujetsResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.CandidatureMappers.SujetEquipeMapperImpl;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.ChefEquipeMapperImpl;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.utilisateurs.ChefEquipe;
import ma.inpt.cedoc.service.CandidatureSevices.SujetService;
import ma.inpt.cedoc.service.utilisateurServices.ChefEquipeService;

@RestController
@RequestMapping("/api/chefs-equipe")
@RequiredArgsConstructor
public class ChefEquipeController {

    private final ChefEquipeService chefEquipeService;
    private final ChefEquipeMapperImpl chefEquipeMapper;

    private final SujetService sujetService;
    private final SujetEquipeMapperImpl sujetEquipeMapper;
    /**
     * GET /api/chefs-equipe/chefs-sujets
     * Renvoie la liste de tous les Chefs d’équipe avec leurs sujets.
     */
    @GetMapping("/chefs-sujets")
    public ResponseEntity<List<ChefSujetsResponseDTO>> getChefsAvecLeursSujets() {
        List<ChefEquipe> tousLesChefs = chefEquipeService.findAll();
        List<ChefSujetsResponseDTO> dtoList = chefEquipeMapper.toDtoList(tousLesChefs);
        return ResponseEntity.ok(dtoList);
    }
    /**
     * GET /api/chefs-equipe/sujets-equipes
     * Renvoie pour chaque Sujet public son intitulé et le nom de l’équipe.
     */
    @GetMapping("/sujets-equipes")
    public ResponseEntity<List<SujetEquipeDTO>> getAllSujetsAvecEquipe() {
        // 1) Récupérer la liste de tous les sujets publics (en DTO), puis charger chaque entité
        List<Sujet> entities = sujetService.getAllPublicSujets().stream()
                .map(dto -> sujetService.getSujetEntityById(dto.getId()))
                .collect(Collectors.toList());

        // 2) Convertir chaque entité en SujetEquipeDTO via le mapper
        List<SujetEquipeDTO> dtoList = entities.stream()
                .map(sujetEquipeMapper::toDto)
                .collect(Collectors.toList());

        return ResponseEntity.ok(dtoList);
    }
}