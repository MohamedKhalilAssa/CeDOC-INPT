package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
// TODO: Add security annotations - uncomment when security is fully configured
// import org.springframework.security.access.annotation.Secured;
// import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.NationaliteRequestDTO;
import ma.inpt.cedoc.model.DTOs.Utilisateurs.NationaliteResponseDTO;
import ma.inpt.cedoc.model.DTOs.mapper.utilisateursMapper.NationaliteMapper;
import ma.inpt.cedoc.model.entities.utilisateurs.Nationalite;
import ma.inpt.cedoc.repositories.utilisateursRepositories.NationaliteRepository;

@Service
@RequiredArgsConstructor
@Transactional
public class NationaliteServiceImpl implements NationaliteService {

    private final NationaliteRepository nationaliteRepository;
    private final NationaliteMapper nationaliteMapper;

    /* CREATE METHODS */
    // DTO-based methods
    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public NationaliteResponseDTO saveNationalite(NationaliteRequestDTO dto) {
        Nationalite nationalite = nationaliteMapper.toEntity(dto);
        Nationalite saved = nationaliteRepository.save(nationalite);
        return nationaliteMapper.toResponseDTO(saved);
    }

    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public List<NationaliteResponseDTO> saveNationalites(List<NationaliteRequestDTO> dtos) {
        List<Nationalite> nationalites = dtos.stream()
                .map(nationaliteMapper::toEntity)
                .collect(Collectors.toList());
        return nationaliteRepository.saveAll(nationalites).stream()
                .map(nationaliteMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    // Entity-based methods
    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public Nationalite saveNationaliteEntity(Nationalite nationalite) {
        return nationaliteRepository.save(nationalite);
    }

    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public List<Nationalite> saveNationalitesEntities(List<Nationalite> nationalites) {
        return nationaliteRepository.saveAll(nationalites);
    }

    /* UPDATE METHODS */
    // DTO-based methods
    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public NationaliteResponseDTO updateNationalite(NationaliteRequestDTO dto, Long id) {
        Nationalite nationalite = nationaliteRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Nationalité introuvable avec l'identifiant : " + id));
        nationaliteMapper.updateFromRequest(dto, nationalite);
        Nationalite updated = nationaliteRepository.save(nationalite);
        return nationaliteMapper.toResponseDTO(updated);
    }

    // Entity-based methods
    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public Nationalite updateNationaliteEntity(Nationalite nationalite, Long id) {
        if (!nationaliteRepository.existsById(id)) {
            throw new EntityNotFoundException("Nationalité introuvable avec l'identifiant : " + id);
        }
        nationalite.setId(id);
        return nationaliteRepository.save(nationalite);
    }

    /* DELETE METHODS */
    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public void deleteNationalite(Nationalite nationalite) {
        nationaliteRepository.delete(nationalite);
    }

    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public void deleteNationaliteById(Long id) {
        if (!nationaliteRepository.existsById(id)) {
            throw new EntityNotFoundException("Nationalité introuvable avec l'identifiant : " + id);
        }
        nationaliteRepository.deleteById(id);
    }

    @Override
    // TODO: Add @Secured("ADMIN") or @PreAuthorize("hasRole('ADMIN')") when roles
    // are defined
    public void deleteAllNationalites() {
        nationaliteRepository.deleteAll();
    }

    /* GET METHODS */
    // DTO-based methods
    @Override
    // TODO: Public access - no security needed, but consider
    // @PreAuthorize("permitAll()") for explicit declaration
    public NationaliteResponseDTO getNationaliteById(Long id) {
        Nationalite nationalite = nationaliteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nationalité introuvable"));
        return nationaliteMapper.toResponseDTO(nationalite);
    }

    @Override
    // TODO: Public access - no security needed, but consider
    // @PreAuthorize("permitAll()") for explicit declaration
    public List<NationaliteResponseDTO> getAllNationalites() {
        return nationaliteRepository.findAll().stream()
                .map(nationaliteMapper::toResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    // TODO: Public access - no security needed, but consider
    // @PreAuthorize("permitAll()") for explicit declaration
    public boolean existsById(Long id) {
        return nationaliteRepository.existsById(id);
    }

    // Entity-based methods
    @Override
    // TODO: Internal use - add @PreAuthorize("hasRole('SYSTEM')") if needed for
    // internal access only
    public Nationalite getNationaliteEntityById(Long id) {
        return nationaliteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Nationalité introuvable"));
    }

    @Override
    // TODO: Internal use - add @PreAuthorize("hasRole('SYSTEM')") if needed for
    // internal access only
    public List<Nationalite> getAllNationalitesEntities() {
        return nationaliteRepository.findAll();
    }
}
