package ma.inpt.cedoc.web.DoctorantActionControllers;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationRequestDTO;
import ma.inpt.cedoc.model.DTOs.DoctorantActions.ConfParticipationResponseDTO;
import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;
import ma.inpt.cedoc.service.DoctorantActionService.ConfParticipationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/confparticipation")
public class ConfParticipationController {
    private final ConfParticipationService confParticipationService;

    @GetMapping("/")
    public List<ConfParticipationResponseDTO> getAllConf(){
        return confParticipationService.getAllConf();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConfParticipationResponseDTO> getConf(@PathVariable Long id){
        ConfParticipationResponseDTO confParticipation = confParticipationService.getConf(id);
        return ResponseEntity.ok(confParticipation);
    }

    @PostMapping("/")
    public ResponseEntity<ConfParticipationResponseDTO> createConf(@RequestBody ConfParticipationRequestDTO confParticipationRequestDTO){
        ConfParticipationResponseDTO c = confParticipationService.createConf(confParticipationRequestDTO);
        return ResponseEntity.ok(c);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConfParticipationResponseDTO> editConf(@RequestBody ConfParticipationRequestDTO confParticipationRequestDTO,
                                                                 @PathVariable Long id){
        ConfParticipationResponseDTO c = confParticipationService.editConf(id, confParticipationRequestDTO);
        return ResponseEntity.ok(c);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteConf(@PathVariable Long id){
        confParticipationService.deleteConf(id);
        return ResponseEntity.ok("La communication à conference " + id + "est supprimé");
    }
}
