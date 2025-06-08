package ma.inpt.cedoc.repositories.model.entities.candidature;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ma.inpt.cedoc.repositories.model.entities.utilisateurs.Candidat;
import ma.inpt.cedoc.repositories.model.enums.candidature_enums.*;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "candidatures")
@Inheritance(strategy = InheritanceType.JOINED)
@EntityListeners(AuditingEntityListener.class)
public class Candidature {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "statut_candidature")
    private CandidatureEnum statutCandidature;
    @Enumerated(EnumType.STRING)
    @Column(name = "mention_bac")
    private MentionEnum mentionBac;

    @Enumerated(EnumType.STRING)
    @Column(name = "diplome")
    private DiplomeEnum diplome;

    @Enumerated(EnumType.STRING)
    @Column(name = "mention_diplome")
    private MentionEnum mentionDiplome;

    @NotBlank(message = "Le dossier de candidature est obligatoire")
    @Column(name = "dossier_candidature")
    private String dossierCandidature; // Peut contenir un lien ou chemin vers un fichier ZIP

    @Enumerated(EnumType.STRING)
    @Column(name = "type_etablissement")
    private EtablissementEnum typeEtablissement;

    @Column(name = "specialite")
    private String specialite;
    @Column(name = "intitule_pfe")
    private String intitulePFE;

    // for logging and administration purposes it will be filled by the system
    @Column(name = "created_at", updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @LastModifiedDate
    private LocalDateTime updatedAt;

    // ---------------------- Relations ----------------------------

    @ManyToMany
    @JoinTable(name = "candidature_sujets", joinColumns = @JoinColumn(name = "candidature_id"), inverseJoinColumns = @JoinColumn(name = "sujet_id"))
    private List<Sujet> sujets;

    @OneToOne
    @JoinColumn(name = "candidat_id", unique = true, nullable = false)
    private Candidat candidat;

}
