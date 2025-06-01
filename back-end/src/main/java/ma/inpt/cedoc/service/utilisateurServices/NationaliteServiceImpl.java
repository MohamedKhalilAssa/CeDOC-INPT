package ma.inpt.cedoc.service.utilisateurServices;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.Nationalite;
import ma.inpt.cedoc.repositories.utilisateursRepositories.NationaliteRepository;

@Service
@RequiredArgsConstructor
public class NationaliteServiceImpl implements NationaliteService {

    private final NationaliteRepository nationaliteRepository;

    @Override
    public Nationalite findById(Long id) {
        return nationaliteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nationalité introuvable"));
    }
}
