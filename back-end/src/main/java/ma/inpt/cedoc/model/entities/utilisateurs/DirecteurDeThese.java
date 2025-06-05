// package ma.inpt.cedoc.model.entities.utilisateurs;

// import java.util.List;

// import com.fasterxml.jackson.annotation.JsonIgnore;

// import jakarta.persistence.*;
// import lombok.*;
// import ma.inpt.cedoc.model.entities.Reinscription.AvisReinscription;
// import ma.inpt.cedoc.model.entities.candidature.Sujet;
// import ma.inpt.cedoc.model.entities.soutenance.DemandeSoutenance;
// import ma.inpt.cedoc.model.entities.soutenance.Jury;

// @Entity
// @Data
// @EqualsAndHashCode(callSuper = true)
// @AllArgsConstructor
// @NoArgsConstructor
// @Table(name="directeurs_de_theses")
// public class DirecteurDeThese extends Professeur {

//     @OneToMany(mappedBy = "directeurDeThese")
//     @JsonIgnore
//     private List<DemandeSoutenance> demandesSoutenance;

//     @OneToMany(mappedBy = "directeurDeThese")
//     @JsonIgnore
//     private List<Jury> jurys;

//     @OneToMany(mappedBy = "directeurDeThese")
//     @JsonIgnore
//     private List<Doctorant> doctorants;

//     @OneToMany(mappedBy = "directeurDeThese")
//     @JsonIgnore
//     private List<Sujet> sujets;

//     @OneToMany(mappedBy = "directeurDeThese", cascade = CascadeType.ALL, orphanRemoval = true)
//     @JsonIgnore
//     private List<AvisReinscription> avisReinscriptionList;

// }
