package ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper;

import ma.inpt.cedoc.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.model.entities.utilisateurs.Utilisateur;

public interface CandidatMapper {
    Candidat toEntity(CandidatRequestDTO dto);
    Candidat FromUtilisateurToCandidat(Utilisateur dto);
}
