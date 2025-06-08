package ma.inpt.cedoc.repositories.ResinscriptionRepositories;

import org.springframework.data.jpa.repository.JpaRepository;

import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;

import java.util.List;

public interface DemandeReinscriptionRepository extends JpaRepository<DemandeReinscription, Long> {
    public List<DemandeReinscription> findByDemandeurId(Long id);
    public List<DemandeReinscription> findBySujetId(Long id);
}
