package ma.inpt.cedoc.model.entities.utilisateurs;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.*;
import ma.inpt.cedoc.model.entities.candidature.Candidature;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "candidats")
public class Candidat {

    @Id
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "utilisateur_id")
    @JsonIgnore
    private Utilisateur utilisateur;

    @Builder.Default
    private boolean archiver = false;

    // ---------------------- Relations ----------------------------

    @OneToOne(mappedBy = "candidat")
    private Candidature candidature;

}
