package ma.inpt.cedoc.web.Utilisateurs;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.ProfesseurMapper;
import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.simpleDTOs.ProfesseurResponseDTO;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Professeur;
import ma.inpt.cedoc.service.utilisateurServices.ProfesseurService;

@RestController
@RequestMapping("/api/professeurs")
@RequiredArgsConstructor
public class ProfesseurController {

    private final ProfesseurService professeurService;
    private final ProfesseurMapper professeurMapper;

    /**
     * GET /api/professeurs
     * Récupère la liste de tous les professeurs
     */
    @GetMapping
    public ResponseEntity<List<ProfesseurResponseDTO>> getAllProfesseurs() {
        List<Professeur> professeurs = professeurService.getAllProfesseurs();
        List<ProfesseurResponseDTO> professeursDto = professeurMapper.toDtoList(professeurs);
        return ResponseEntity.ok(professeursDto);
    }

    /**
     * GET /api/professeurs/{id}
     * Récupère un professeur par son ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProfesseurResponseDTO> getProfesseurById(@PathVariable Long id) {
        Professeur professeur = professeurService.getProfesseurById(id);
        ProfesseurResponseDTO professeurDto = professeurMapper.toDto(professeur);
        return ResponseEntity.ok(professeurDto);
    }

    /**
     * GET /api/professeurs/search
     * Recherche des professeurs par nom ou email
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProfesseurResponseDTO>> searchProfesseurs(@RequestParam String query) {
        List<Professeur> professeurs = professeurService.searchForProfesseurs(query);

        List<ProfesseurResponseDTO> professeursDto = professeurMapper.toDtoList(professeurs);
        return ResponseEntity.ok(professeursDto);
    }
}
