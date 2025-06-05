package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirecteurDeTheseRoleRepository;

@Service
@RequiredArgsConstructor
public class DirecteurDeTheseServiceImpl implements DirecteurDeTheseService {

    private final DirecteurDeTheseRoleRepository directeurDeTheseRoleRepository;

    @Override
    public boolean existsById(Long id) {
        return directeurDeTheseRoleRepository.existsById(id);
    }

    @Override
    public List<DirecteurDeTheseRole> findAll() {
        return directeurDeTheseRoleRepository.findAll();
    }

    @Override
    public DirecteurDeTheseRole findById(Long id) {
        return directeurDeTheseRoleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Directeur de thèse introuvable"));
    }
    
}
