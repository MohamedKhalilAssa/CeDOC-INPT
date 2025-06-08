package ma.inpt.cedoc.model.DTOs.mapper.MapperHelpers.utilisateurs;

import org.mapstruct.Named;
import org.springframework.stereotype.Component;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Nationalite;
import ma.inpt.cedoc.repositories.utilisateursRepositories.NationaliteRepository;

@Component
@RequiredArgsConstructor
public class NationaliteMapperHelper {
    private final NationaliteRepository repository;

    @Named("mapNationalite")

    public Nationalite map(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nationalité introuvable"));
    }
}