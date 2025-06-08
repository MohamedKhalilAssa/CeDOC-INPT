package ma.inpt.cedoc.repositories.utilisateursRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.utilisateurs.LieuDeNaissance;

public interface LieuDeNaissanceRepository extends JpaRepository<LieuDeNaissance, Long> {
}