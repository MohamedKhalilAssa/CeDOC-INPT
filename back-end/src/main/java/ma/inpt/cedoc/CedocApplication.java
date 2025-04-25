package ma.inpt.cedoc;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import ma.inpt.cedoc.Configuration.Security.JWT.JwtUtil;

@SpringBootApplication
@EnableJpaAuditing
public class CedocApplication {

	public static void main(String[] args) {
		SpringApplication.run(CedocApplication.class, args);
	}

	@Bean
	CommandLineRunner init(JwtUtil jwtUtil) {
		return args -> {
			System.out.println("");
			;
		};
	}

}
