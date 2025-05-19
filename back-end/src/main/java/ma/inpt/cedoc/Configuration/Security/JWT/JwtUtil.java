package ma.inpt.cedoc.Configuration.Security.JWT;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import ma.inpt.cedoc.model.entities.auth.Token;
import ma.inpt.cedoc.repositories.authRepositories.TokenRepository;

/*This class contains all the basic and utility JWT functions that will be used multiple times throughout the application  */
@Component
public class JwtUtil {

    public final static String AUTHORIZATION_PREFIX = "Bearer ";
    private final String JWT_SECRET;
    @Value("${jwt.refreshTokenExpiration}")
    private long refreshTokenExpiration;
    private final long accessTokenExpiration;
    private final TokenRepository tokenRepository;

    JwtUtil(@Value("${jwt.secret}") String JWT_SECRET,
            @Value("${jwt.accessTokenExpiration}") long accessTokenExpiration, TokenRepository tokenRepository) {
        this.accessTokenExpiration = accessTokenExpiration; // 15 minutes
        this.JWT_SECRET = JWT_SECRET;
        this.tokenRepository = tokenRepository;
    }

    // Generating the jwt token
    /* ACCESS TOKEN */
    public String generateAccessToken(UserDetails userDetails) {
        return generateAccessToken(new HashMap<>(), userDetails);
    }

    public String generateAccessToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, accessTokenExpiration);
    }

    /* REFRESH TOKEN */
    public String generateRefreshToken(UserDetails userDetails) {
        return buildToken(new HashMap<>(), userDetails, refreshTokenExpiration);
    }

    public String generateRefreshToken(Map<String, Object> extraClaims,
            UserDetails userDetails) {
        return buildToken(extraClaims, userDetails, refreshTokenExpiration);
    }

    /* BUILD TOKEN */
    public String generateAccessTokenWithOnlyEmail(UserDetails userDetails) {
        final long expiration = 300; // 5 minutes
        return Jwts.builder()
                .setHeaderParam("typ", "JWT") // Manually setting the 'typ' claim
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {

        Map<String, Object> claims = new HashMap<String, Object>(extraClaims);
        claims.put("roles", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());
        return Jwts.builder()
                .setHeaderParam("typ", "JWT") // Manually setting the 'typ' claim
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .addClaims(claims)
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Checking Token Validity

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractSubject(token);
        final Token userToken = tokenRepository.findByToken(token).orElse(null);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token) && !userToken.isRevoked());
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extracting DATA from the jwt token
    private Claims extractAllClaims(String token) {
        try {
            return Jwts
                    .parserBuilder()
                    .setSigningKey(getSignInKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new IllegalArgumentException("Token has expired" + e.getMessage(), e);
        } catch (UnsupportedJwtException e) {
            throw new IllegalArgumentException("Unsupported JWT token." + e.getMessage(), e);
        } catch (MalformedJwtException e) {
            throw new IllegalArgumentException("Malformed JWT token." + e.getMessage(), e);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Token is null or empty." + e.getMessage(), e);
        } catch (Exception e) {
            throw new IllegalArgumentException("Failed to extract claims from token." + e.getMessage(), e);
        }
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public String extractSubject(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public void validate(String token) throws JwtException {
        Jwts.parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token);
    }
    // Getting the JWT_SECRET key
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
