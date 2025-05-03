package ma.inpt.cedoc.model.DTOs.mapper.MapperHelpers.utilisateurs;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.LieuDeNaissance;
import ma.inpt.cedoc.repositories.utilisateursRepositories.LieuDeNaissanceRepository;

@Component
@RequiredArgsConstructor
public class LieuDeNaissanceMapperHelper {
    private final LieuDeNaissanceRepository repository;

    @Named("mapLieuDeNaissance")

    public LieuDeNaissance map(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lieu de naissance introuvable"));
    }
}