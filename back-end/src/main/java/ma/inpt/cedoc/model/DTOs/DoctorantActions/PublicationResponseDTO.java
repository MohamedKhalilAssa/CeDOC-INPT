package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Generic.BaseResponseDTO;
import ma.inpt.cedoc.model.enums.doctorant_enums.EtatEnum;

import java.time.ZonedDateTime;

@Data
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
