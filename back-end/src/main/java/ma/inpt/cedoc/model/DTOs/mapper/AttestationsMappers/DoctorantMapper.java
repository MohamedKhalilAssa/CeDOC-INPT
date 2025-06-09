package ma.inpt.cedoc.model.DTOs.mapper.AttestationsMappers;

import ma.inpt.cedoc.model.DTOs.Attestation.DoctorantRequestDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;

public interface DoctorantMapper {

    Doctorant doctorantRequestDTOToDoctorant(DoctorantRequestDTO dto);
}
