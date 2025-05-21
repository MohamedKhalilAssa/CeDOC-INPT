package ma.inpt.cedoc.model.DTOs.Candidature;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.candidature_enums.*;

@Data
@SuperBuilder
@NoArgsConstructor
@AllArgsConstructor
public class CandidatureResponseDTO extends BaseResponseDTO {

    private CandidatureEnum statutCandidature;

    private MentionEnum mentionBac;
    private MentionEnum mentionDiplome;

    private String dossierCandidature;
    private EtablissementEnum typeEtablissement;

    private String specialite;
    private String intitulePFE;

    private StatutProfessionnelEnum statutProfessionnel;

    private List<Long> sujetsIds; // or SujetDTOs if needed (light version to avoid recursion)

    private Long candidatId;
}
