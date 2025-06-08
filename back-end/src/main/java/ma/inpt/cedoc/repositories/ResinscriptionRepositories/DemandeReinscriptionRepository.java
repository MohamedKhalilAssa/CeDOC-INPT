package ma.inpt.cedoc.repositories.ResinscriptionRepositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;

import java.util.List;

public interface DemandeReinscriptionRepository extends JpaRepository<DemandeReinscription, Long> {
    public Page<DemandeReinscription> findByDemandeurId(Long id, Pageable pageable);
    public List<DemandeReinscription> findBySujetId(Long id);
}
