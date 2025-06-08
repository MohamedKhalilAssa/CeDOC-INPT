package ma.inpt.cedoc.repositories.ResinscriptionRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.repositories.model.entities.Reinscription.AvisReinscription;

public interface AvisReinscriptionRepository extends JpaRepository<AvisReinscription, Long> {
}
