package com.kurth.kurth.services;

import com.kurth.kurth.dto.login.LoginRequest;
import com.kurth.kurth.dto.login.LoginResponse;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.UserRepository;
import com.nimbusds.jwt.JWTClaimsSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Date;
import java.util.Optional;

@Service
public class TokenService {

    @Autowired
    private UserRepository userRepository;

    private final JwtEncoder jwtEncoder;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public TokenService(JwtEncoder jwtEncoder, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.jwtEncoder = jwtEncoder;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    public LoginResponse login(LoginRequest loginRequest) {
        Optional<User> user = userRepository.findByUsername(loginRequest.username());

        if(user.isEmpty() || !user.get().isLoginCorrect(loginRequest, bCryptPasswordEncoder)) {
            throw new BadCredentialsException("Invalid username or password");
        }

        Instant now = Instant.now();
        Long expiresIn = 300L;

        Instant issuedAt = now.plusSeconds(expiresIn);

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("Kurth System")
                .subject(user.get().getId().toString())
                .issuedAt(now)
                .expiresAt(issuedAt)
                .build();

        //obter token jwt
        String jwtValue = jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();

        return new LoginResponse(jwtValue, expiresIn);
    }
}
