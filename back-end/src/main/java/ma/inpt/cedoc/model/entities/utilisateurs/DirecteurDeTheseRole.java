package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.Reinscription.AvisReinscription;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;
import ma.inpt.cedoc.model.entities.soutenance.Jury;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "directeur_de_these_roles")
public class DirecteurDeTheseRole {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "professeur_id")
    @JsonIgnore
    private Professeur professeur;

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
    private List<Sujet> sujets = new ArrayList<>();

    @OneToMany(mappedBy = "directeurDeThese", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<AvisReinscription> avisReinscriptionList;

}
