package ma.inpt.cedoc.Configuration.Security;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import lombok.RequiredArgsConstructor;
import ma.inpt.cedoc.Configuration.Security.JWT.AccessTokenFilter;
import ma.inpt.cedoc.Configuration.Security.JWT.RefreshTokenFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfiguration {

        private final AccessTokenFilter AccessTokenFilter;
        private final RefreshTokenFilter refreshTokenFilter;

        private final AuthenticationProvider authenticationProvider;
        private final UserDetailsService userDetailsService;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

                return http
                                .cors(cors -> cors.configurationSource(corsConfigurationSource()))

                                .csrf(csrf -> csrf.disable())
                                .addFilterBefore(
                                                AccessTokenFilter, UsernamePasswordAuthenticationFilter.class)
                                .addFilterAfter(refreshTokenFilter,
                                                AccessTokenFilter.class)
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/api/auth/logout", "/api/auth/check").authenticated()
                                                .requestMatchers(HttpMethod.GET, "/api/*/public/**").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/formations").permitAll()
                                                .requestMatchers(HttpMethod.GET, "/api/sujets/chefs-sujets-equipes")
                                                .permitAll()
                                                .requestMatchers("/images/**", "/api/auth/**", "/api/guest/**",
                                                                "/api/utilisateurs/assign-role",
                                                                "/api/utilisateurs/set-role")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .sessionManagement(session -> session
                                                .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(authenticationProvider)
                                .userDetailsService(userDetailsService)

                                .build();

        }

        @Value("${app.front-end-url}")
        private String frontEndURL;

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(List.of(frontEndURL));
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                config.setAllowedHeaders(List.of("*"));
                config.setExposedHeaders(List.of("Authorization"));
                config.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", config);
                return source;
        }

}
