package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;
import ma.inpt.cedoc.model.entities.soutenance.Jury;
import ma.inpt.cedoc.model.entities.soutenance.Soutenance;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@Table(name="directeur_de_these")
@DiscriminatorValue("DIRECTEUR_DE_THESE")
public class DirecteurDeThese extends Professeur {

    @OneToMany(mappedBy = "directeurDeThese")
    @JsonIgnore
    private List<DemandeSoutenance> demandesSoutenance;

    @OneToMany(mappedBy = "directeurDeThese")
    @JsonIgnore
    private List<Jury> jurys;

    @OneToMany(mappedBy = "directeurDeThese")
    @JsonIgnore
    private List<Doctorant> doctorants;

    @OneToMany(mappedBy = "directeurDeThese")
    @JsonIgnore
    private List<Sujet> sujets;

}
