package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.dto.login.LoginRequest;
import com.kurth.kurth.dto.login.TokenResponse;
import com.kurth.kurth.services.TokenService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
public class TokenController {

    @Autowired
    private TokenService tokenService;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public TokenController(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        TokenResponse tokenResponse = tokenService.login(loginRequest);

        Cookie cookie = new Cookie("token", tokenResponse.accessToken());
        cookie.setHttpOnly(true);
        cookie.setSecure(false);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);

        response.addCookie(cookie);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(tokenResponse).toUri();
        return ResponseEntity.ok().location(uri).body(tokenResponse);
    }

    @PostMapping("/register")
    public ResponseEntity<TokenResponse> register(@RequestBody UserDTO userDTO, HttpServletResponse response) {
        TokenResponse register = tokenService.register(userDTO);

        Cookie token = new Cookie("token", register.accessToken());
        token.setHttpOnly(true);
        token.setSecure(false);
        token.setPath("/");
        token.setMaxAge(60 * 60 * 24);

        response.addCookie(token);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(register.accessToken()).toUri();
        return ResponseEntity.created(uri).body(register);
    }
}
