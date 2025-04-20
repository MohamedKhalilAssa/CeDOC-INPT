package ma.inpt.cedoc.Configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.repositories.utilisateursRepositories.UtilisateurRepository;

@RequiredArgsConstructor
@Configuration
public class ApplicationConfiguration {
    private final UtilisateurRepository utilisateurRepository;

    @Bean
    public UserDetailsService userDetailsService() {
        return username -> utilisateurRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur introuvable."));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
