package ma.inpt.cedoc.model.entities.utilisateurs;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;
import ma.inpt.cedoc.model.entities.DoctorantActions.Publication;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;
import ma.inpt.cedoc.model.entities.soutenance.Jury;
import ma.inpt.cedoc.model.enums.utilisateur_enums.CEDocEnum;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name="direction_cedoc")
public class DirectionCedoc {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "utilisateur_id")
    private Utilisateur utilisateur;

    @Column(name="role_administrative")
    @NotNull(message = "Veuillez précisez le rôle administrative.")
    @Enumerated(EnumType.STRING)
    private CEDocEnum roleAdministrative;
    
    // ---------------------- Relations ----------------------------

    @OneToMany(mappedBy = "directionCedoc")
    @JsonIgnore
    private List<Jury> jurys;

    @OneToMany(mappedBy = "directionCedoc")
    @JsonIgnore
    private List<DemandeSoutenance> demandesSoutenance;

    @OneToMany(mappedBy = "validateur", cascade = CascadeType.PERSIST)
    private List<Publication> publicationsValide;

    @OneToMany(mappedBy = "validateur", cascade = CascadeType.PERSIST)
    private List<ConfParticipation> confParticipationsValide;

    // demandes de réinscription révisé
    @OneToMany(mappedBy = "DirectionCedocValidateur")
    @JsonIgnore
    private List<DemandeReinscription> demandesReinscriptions;
}
