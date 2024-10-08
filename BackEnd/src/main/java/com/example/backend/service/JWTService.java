package com.example.backend.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
@Service
public class JWTService {
// Replace this with a strong key
    private final String privateKey = "R8fV7kz2x9P1q3Yv4Zt6W0mA5rNc8JqL0pTs3KdV6nXoH7G";
    private final long expirationTimeInMillis = 1000 * 60 * 60 * 24 * 7;

//    public JWTService() {
//        try {
//            KeyGenerator keygen =KeyGenerator.getInstance("HmacSHA256");
//            SecretKey key = keygen.generateKey();
//            privateKey = Base64.getEncoder().encodeToString(key.getEncoded());
//        }catch (NoSuchAlgorithmException e) {
//            throw new RuntimeException(e);
//        }
//    }

    public String generateToken(String email) {
        Map<String,Object> claims = new HashMap<String,Object>();
        return Jwts.builder().claims().add(claims).subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTimeInMillis))
                .and().signWith(getkey()).compact();
    }

    private SecretKey getkey(){
        byte[] keyByte = Base64.getDecoder().decode(privateKey);
        return Keys.hmacShaKeyFor(keyByte);
    }

    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }
    private <T> T extractClaim(String token, Function<Claims,T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getkey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public boolean isValidToken(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public long getExpirationTime() {
        return expirationTimeInMillis/1000;
    }
}
