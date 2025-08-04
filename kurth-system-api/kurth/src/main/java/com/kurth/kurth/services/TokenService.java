package com.kurth.kurth.services;

import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.dto.login.LoginRequest;
import com.kurth.kurth.dto.login.TokenResponse;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
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

    public TokenResponse login(LoginRequest loginRequest) {
        Optional<User> user = userRepository.findByUsername(loginRequest.username());

        if(user.isEmpty() || !user.get().isLoginCorrect(loginRequest, bCryptPasswordEncoder)) {
            throw new BadCredentialsException("Invalid username or password");
        }

        String accessToken = jwtGenerate(user);

        return new TokenResponse(accessToken);
    }


    public TokenResponse register(UserDTO userDTO) {
        User user = new User();
        copyDtoToEntity(userDTO, user);

        userRepository.save(user);
        String accessToken = jwtGenerate(Optional.of(user));

        return new TokenResponse(accessToken);
    }


    protected String jwtGenerate(Optional<User> user) {
        Instant now = Instant.now();
        Long expiresIn = 7200L;
        Instant issuedAt = now.plusSeconds(expiresIn);

        JwtClaimsSet claimsSet = JwtClaimsSet.builder()
                .issuer("Kurth System")
                .subject(user.get().getId().toString())
                .issuedAt(now)
                .expiresAt(issuedAt)
                .build();

        //obter token jwt
        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }


    private void copyDtoToEntity(UserDTO userDTO, User user) {
        user.setName(userDTO.getName());
        user.setUsername(userDTO.getUsername());

        user.setEmail(userDTO.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));

        user.setCreatedAt(userDTO.getCreatedAt());
        user.setFollowers(userDTO.getFollowers());
        user.setFollowing(userDTO.getFollowing());
        user.setPosts(userDTO.getPosts());
        user.setAvatar(userDTO.getAvatar());
        user.setBio(userDTO.getBio());
    }
}
