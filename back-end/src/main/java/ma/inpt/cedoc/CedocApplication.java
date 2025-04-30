package ma.inpt.cedoc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import ma.inpt.cedoc.model.entities.utilisateurs.Role;
import ma.inpt.cedoc.repositories.utilisateursRepositories.RoleRepository;
import ma.inpt.cedoc.service.utilisateurServices.UtilisateurService;

@SpringBootApplication
@EnableJpaAuditing
public class CedocApplication {

	public static void main(String[] args) {
		SpringApplication.run(CedocApplication.class, args);
	}

	@Bean
	CommandLineRunner init(UtilisateurService user, RoleRepository role) {
		return args -> {
			// role.save(Role.builder().intitule("ADMIN").build());
			// user.assignRoleToUtilisateur("ali.bensalah@example.com", "ADMIN");
		};
	}

}
