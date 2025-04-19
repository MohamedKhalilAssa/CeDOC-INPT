package ma.inpt.cedoc;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CedocApplication {

	public static void main(String[] args) {
		SpringApplication.run(CedocApplication.class, args);
	}

}
