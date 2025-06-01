package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
public class PublicationResponseDTO extends BaseResponseDTO {

    private String titre;

    private String journal;

    private ZonedDateTime datePublication;

    private EtatEnum status;

    private String justificatif;

    private String autresAuteurs;

    private String prixIntitule;

    private Long auteurId;

    private Long validateurId;
}
