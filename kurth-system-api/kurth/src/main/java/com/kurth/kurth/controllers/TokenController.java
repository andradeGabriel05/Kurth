package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.login.LoginRequest;
import com.kurth.kurth.dto.login.LoginResponse;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.UserRepository;
import com.kurth.kurth.services.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
public class TokenController {

    @Autowired
    private TokenService tokenService;


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        LoginResponse loginResponse = tokenService.login(loginRequest);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(loginResponse).toUri();
        return ResponseEntity.created(uri).body(loginResponse);
    }
}
