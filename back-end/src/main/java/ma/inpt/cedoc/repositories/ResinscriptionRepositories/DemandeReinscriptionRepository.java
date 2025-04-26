package ma.inpt.cedoc.repositories.ResinscriptionRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;

public interface DemandeReinscriptionRepository extends JpaRepository<DemandeReinscription, Long> {
}
