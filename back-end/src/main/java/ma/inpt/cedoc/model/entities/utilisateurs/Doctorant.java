package ma.inpt.cedoc.model.entities.utilisateurs;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.*;
import ma.inpt.cedoc.model.entities.DoctorantActions.ConfParticipation;
import ma.inpt.cedoc.model.entities.DoctorantActions.Publication;
import ma.inpt.cedoc.model.entities.Reinscription.DemandeReinscription;
import ma.inpt.cedoc.model.entities.attestation.DemandeAttestation;
import ma.inpt.cedoc.model.entities.candidature.Sujet;
import ma.inpt.cedoc.model.entities.formation.Formation;
import ma.inpt.cedoc.model.entities.formation.SeanceFormation;
import ma.inpt.cedoc.model.entities.formation.Vacation;
import ma.inpt.cedoc.model.enums.utilisateur_enums.DoctorantEnum;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "doctorants")
public class Doctorant {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        @OneToOne
        @MapsId
        @JoinColumn(name = "utilisateur_id")
        private Utilisateur utilisateur;

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

        @Builder.Default
    private boolean archiver = false;

        // Relations
        @ManyToOne
        @JoinColumn(name = "equipe_de_recherche_id")
        private EquipeDeRecherche equipeDeRecherche;

        @ManyToOne
        @JoinColumn(name = "directeur_role_id")
        private DirecteurDeTheseRole directeurDeThese;

        @ManyToOne
        @JoinColumn(name = "sujet_id")
        private Sujet sujet;

        /*------------------- Relation -----------------*/
        // Relation avec Formation
        @ManyToMany(mappedBy = "doctorantsCibles")
        private List<Formation> formationsProposees;

        // Relation avec SeanceFormation
        @OneToMany(mappedBy = "declarant")
        private List<SeanceFormation> seancesDeclarees;

        // Relation avec Vacation
        @OneToMany(mappedBy = "doctorant",
                        // Persister/supprimer un Doctorant entraîne la même action sur ses
                        // vacations.Retirer une vacation de la liste vacationsAssurees la supprime en
                        // base.
                        cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Vacation> vacationsAssurees;

        @OneToMany(mappedBy = "doctorant")
        private List<DemandeAttestation> demandeAttestations;

        @OneToMany(mappedBy = "demandeur")
        @JsonIgnore
        private List<DemandeReinscription> demandesReinscription;

        @OneToMany(mappedBy = "auteur", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<Publication> publications;

        @OneToMany(mappedBy = "participant", cascade = CascadeType.ALL, orphanRemoval = true)
        private List<ConfParticipation> confParticipations;
}
