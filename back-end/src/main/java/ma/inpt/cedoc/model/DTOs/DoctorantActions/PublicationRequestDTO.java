package ma.inpt.cedoc.model.DTOs.DoctorantActions;

import java.time.ZonedDateTime;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PublicationRequestDTO {

    private String titre;

    private String journal;

    private ZonedDateTime datePublication;

    private String justificatif;

    private String autresAuteurs;

    private String prixIntitule;
}
