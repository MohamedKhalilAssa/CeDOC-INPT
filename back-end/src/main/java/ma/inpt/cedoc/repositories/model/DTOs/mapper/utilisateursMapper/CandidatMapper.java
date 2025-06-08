package ma.inpt.cedoc.repositories.model.DTOs.mapper.utilisateursMapper;

import ma.inpt.cedoc.repositories.model.DTOs.Utilisateurs.CandidatRequestDTO;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Utilisateur;

public interface CandidatMapper {
    Candidat toEntity(CandidatRequestDTO dto);
    Candidat FromUtilisateurToCandidat(Utilisateur dto);
}
