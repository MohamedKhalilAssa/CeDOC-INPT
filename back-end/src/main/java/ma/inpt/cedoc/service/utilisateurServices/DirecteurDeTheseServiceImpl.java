package ma.inpt.cedoc.service.utilisateurServices;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;
import ma.inpt.cedoc.model.entities.utilisateurs.DirecteurDeTheseRole;
import ma.inpt.cedoc.model.entities.utilisateurs.Doctorant;
import ma.inpt.cedoc.repositories.candidatureRepositories.SujetRepository;
import ma.inpt.cedoc.repositories.soutenanceRepositories.DemandeSoutenanceRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DirecteurDeTheseRoleRepository;
import ma.inpt.cedoc.repositories.utilisateursRepositories.DoctorantRepository;

@Service
@RequiredArgsConstructor
public class DirecteurDeTheseServiceImpl implements DirecteurDeTheseService {
    private final DirecteurDeTheseRoleRepository directeurDeTheseRoleRepository;
    private final SujetRepository sujetRepository;
    private final DoctorantRepository doctorantRepository;
    private final DemandeSoutenanceRepository demandeSoutenanceRepository;

    // ───–──── READ BASIQUES ───–────

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

    // ───–──── MÉTIER / LOGIQUE "SUJETS / DOCTORANTS / SOUTENANCES" ───–────

    @Override
    public List<Sujet> findSujetsByDirecteurId(Long directeurId) {
        return sujetRepository.findByDirecteurDeTheseId(directeurId);
    }

    @Override
    public List<Doctorant> findDoctorantsByDirecteurId(Long directeurId) {
        return doctorantRepository.findByDirecteurDeTheseId(directeurId);
    }

    @Override
    public List<DemandeSoutenance> findDemandesSoutenanceByDirecteurId(Long directeurId) {
        return demandeSoutenanceRepository.findByDirecteurDeTheseId(directeurId);
    }

    @Override
    @Transactional
    public Sujet validerSujet(Long directeurId, Long sujetId) {
        Sujet sujet = sujetRepository.findById(sujetId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Sujet introuvable avec l'identifiant : " + sujetId));

        // Vérifier que le sujet appartient bien à ce directeur
        if (sujet.getDirecteurDeThese() == null || !sujet.getDirecteurDeThese().getId().equals(directeurId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "Vous n'avez pas accès à ce sujet (directeur id mismatch).");
        }

        sujet.setValide(true);
        sujet.setEstPublic(true);
        return sujetRepository.save(sujet);
    }

    // ───–──── CRUD COMPLET POUR DirecteurDeTheseRole ───–────

    @Override
    @Transactional
    public DirecteurDeTheseRole createDirecteurDeThese(DirecteurDeTheseRole directeurDeTheseRole) {
        return directeurDeTheseRoleRepository.save(directeurDeTheseRole);
    }

    @Override
    @Transactional
    public DirecteurDeTheseRole updateDirecteurDeThese(Long id, DirecteurDeTheseRole dto) {
        DirecteurDeTheseRole existingDirecteur = directeurDeTheseRoleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Directeur de thèse introuvable avec l'identifiant : " + id));

        // Update fields (keeping the ID and professor relationship)
        dto.setId(id);
        dto.setProfesseur(existingDirecteur.getProfesseur());

        return directeurDeTheseRoleRepository.save(dto);
    }

    @Override
    @Transactional
    public void deleteDirecteurDeThese(Long id) {
        DirecteurDeTheseRole directeur = directeurDeTheseRoleRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Directeur de thèse introuvable avec l'identifiant : " + id));

        // Vérifier s'il y a des relations actives qui empêcheraient la suppression
        if (directeur.getSujets() != null && !directeur.getSujets().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Impossible de supprimer ce directeur de thèse : il a encore des sujets associés.");
        }

        if (directeur.getDoctorants() != null && !directeur.getDoctorants().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Impossible de supprimer ce directeur de thèse : il a encore des doctorants associés.");
        }

        if (directeur.getDemandesSoutenance() != null && !directeur.getDemandesSoutenance().isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Impossible de supprimer ce directeur de thèse : il a encore des demandes de soutenance associées.");
        }

        directeurDeTheseRoleRepository.deleteById(id);
    }
}
