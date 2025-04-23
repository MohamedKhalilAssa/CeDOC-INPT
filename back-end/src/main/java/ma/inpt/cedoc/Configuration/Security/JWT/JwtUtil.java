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

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.Getter;

/*This class contains all the basic and utility JWT functions that will be used multiple times throughout the application  */
@Component
@Getter
public class JwtUtil {

    public final static String AUTH_PREFIX = "Bearer ";
    private final String JWT_SECRET;
    @Value("${jwt.refreshTokenExpiration}")
    private long refreshTokenExpiration;
    private final long accessTokenExpiration;

    JwtUtil(@Value("${jwt.secret}") String JWT_SECRET,
            @Value("${jwt.accessTokenExpiration}") long accessTokenExpiration) {
        this.accessTokenExpiration = accessTokenExpiration; // 15 minutes
        this.JWT_SECRET = JWT_SECRET;
    }

    // Generating the jwt token

    private String buildToken(Map<String, Object> extraClaims, UserDetails userDetails, long expiration) {
        Map<String, Object> claims = new HashMap<String, Object>(extraClaims);
        claims.put("roles", userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList());
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .setClaims(claims)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Checking Token Validity

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractSubject(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    // Extracting DATA from the jwt token
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
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

    // Getting the JWT_SECRET key
    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(JWT_SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
