package ma.inpt.cedoc.repositories.ResinscriptionRepositories;

import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DemandeReinscriptionRepo extends JpaRepository<DemandeReinscription, Long> {
}
