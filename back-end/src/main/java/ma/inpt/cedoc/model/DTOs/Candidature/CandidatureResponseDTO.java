package ma.inpt.cedoc.model.DTOs.Candidature;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.candidature_enums.CandidatureEnum;
import ma.inpt.cedoc.model.enums.candidature_enums.DiplomeEnum;
import ma.inpt.cedoc.model.enums.candidature_enums.EtablissementEnum;
import ma.inpt.cedoc.model.enums.candidature_enums.MentionEnum;

@Data
@SuperBuilder
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
@AllArgsConstructor
public class CandidatureResponseDTO extends BaseResponseDTO {
    private CandidatureEnum statutCandidature;

    private MentionEnum mentionBac;
    private DiplomeEnum diplome;
    private MentionEnum mentionDiplome;

    private String dossierCandidature;
    private EtablissementEnum typeEtablissement;
    private String specialite;
    private String intitulePFE;

    private List<Long> sujetsIds; // or SujetDTOs if needed (light version to avoid recursion)

    private Long candidatId;
}
