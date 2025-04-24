package ma.inpt.cedoc.model.entities.utilisateurs;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.model.entities.Doctorant_Actions.CommunicationConference;
import ma.inpt.cedoc.model.entities.Doctorant_Actions.Publication;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;
import ma.inpt.cedoc.model.enums.utilisateur_enums.DoctorantEnum;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "doctorants")
public class Doctorant extends Utilisateur {

    @Column(name = "date_inscription")
    @NotNull(message = "La date d'inscription est obligatoire.")
    @PastOrPresent(message = "La date de d'inscription doit être dans le passé ou aujourd'hui.")
    private LocalDate dateInscription;

    @Column(name = "statut_doctorant")
    @NotNull(message = "Le statut du doctorant est obligatoire.")
    @Enumerated(EnumType.STRING)
    private DoctorantEnum statutDoctorant;

    @Column(name = "nombre_heures_labo")
    @NotNull(message = "Le nombre d'heures de laboratoire est obligatoire.")
    private int NombreHeuresLabo;

    @Column(name = "draft_diplome_url")
    @Nullable
    private String draftDiplomeUrl;

    private boolean archiver = false;

    @ManyToOne
    @JoinColumn(name = "equipe_de_recherche_id")
    private EquipeDeRecherche equipeDeRecherche;

    @ManyToOne
    @JoinColumn(name = "directeur_id")
    private DirecteurDeThese directeurDeThese;

    @ManyToOne
    @JoinColumn(name = "sujet_id")
    private Sujet sujet;

    @ManyToMany
    @JoinTable(
            name = "Doctorant_Publication",
            joinColumns = @JoinColumn(name = "doctorant_id"),
            inverseJoinColumns = @JoinColumn(name = "publication_id")
    )
    private List<Publication> publications;

    @ManyToMany
    @JoinTable(
            name = "Doctorant_Communication",
            joinColumns = @JoinColumn(name = "doctorant_id"),
            inverseJoinColumns = @JoinColumn(name = "communication_id")
    )
    private List<CommunicationConference> communications;

    @OneToMany(mappedBy = "demandeur")
    @JsonIgnore
    private List<DemandeReinscription> demandesReinscription;


}
