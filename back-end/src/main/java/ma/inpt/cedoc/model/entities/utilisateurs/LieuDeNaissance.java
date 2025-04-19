package ma.inpt.cedoc.model.entities.utilisateurs;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.ZonedDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Table(name="lieu_de_naissance")
public class LieuDeNaissance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Le pays est obligatoire")
    @Size(min = 2, max = 50, message = "Le pays doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "Le pays ne doit contenir que des lettres, des espaces ou des tirets")
    private String pays;

    @Size(min = 2, max = 50, message = "La ville doit contenir entre 2 et 50 caractères")
    @Pattern(regexp = "^[\\p{L} '-]+$", message = "La ville ne doit contenir que des lettres, des espaces ou des tirets")
    private String ville;


    //    for logging and administration purposes it will be filled by the system
    @Column(name="created_at", updatable = false)
    @CreatedDate
    private ZonedDateTime createdAt;

    @Column(name="updated_at")
    @LastModifiedDate
    private ZonedDateTime updatedAt;

//    Relations

    @OneToMany(mappedBy = "lieuDeNaissance")
    private List<Utilisateur> utilisateurs;
}
