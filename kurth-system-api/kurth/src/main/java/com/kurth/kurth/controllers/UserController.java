package com.kurth.kurth.controllers;


import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.services.UserService;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;


    @GetMapping(value = "/{id}")
    public UserDTO findById(@PathVariable UUID id) {
        return userService.findById(id);
    }

    @GetMapping(value = "/username/{username}")
    public UserDTO findByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }


    @GetMapping
    public ResponseEntity<Page<UserDTO>> findAll(Pageable pageable) {

        Page<UserDTO> userDTO = userService.findAll(pageable);
        return ResponseEntity.ok(userDTO);
    }

//    @PostMapping
//    public ResponseEntity<UserDTO> insert(@RequestBody UserDTO userDTO) {
//        userDTO = userService.newUser(userDTO);
//        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(userDTO.getId()).toUri();
//        return ResponseEntity.created(uri).body(userDTO);
//    }

    @PutMapping
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO userDTO) {
        userDTO = userService.update(userDTO);
        return ResponseEntity.ok(userDTO);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

//
//    @PostMapping(value = "/login")
//    public ResponseEntity<?> login(@RequestBody UserDTO userDTO) {
//        String username = userDTO.getUsername();
//        String password = userDTO.getPassword();
//
//        UserDTO userLogin = userService.login(username, password);
//
//        if (userLogin != null) {
//            return ResponseEntity.ok(userLogin);
//        } else {
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
//        }
//    }

    @PutMapping(value = "{id}/update-follower")
    public ResponseEntity<UserDTO> updateFollower(@PathVariable UUID id) {
        UserDTO userDTO = userService.updateFollower(id);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping(value = "/update-following")
    public ResponseEntity<UserDTO> updateFollowing() {
        UserDTO userDTO = userService.updateFollowing();
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping(value = "{id}/update-remove-follower")
    public ResponseEntity<UserDTO> updateRemoveFollower(@PathVariable UUID id) {
        UserDTO userDTO = userService.updateRemoveFollower(id);
        return ResponseEntity.ok(userDTO);
    }

    @PutMapping(value = "/update-remove-following")
    public ResponseEntity<UserDTO> updateRemoveFollowing() {
        UserDTO userDTO = userService.updateRemoveFollowing();
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping(value = "/me")
    public ResponseEntity<UserDTO> getCurrentUser() {
        UserDTO userDTO = userService.getCurrentUser();
        return ResponseEntity.ok(userDTO);
    }

    @GetMapping(value = "/is-authenticated")
    public ResponseEntity<Boolean> isUserAuthenticated() {
        Boolean authenticated = userService.isUserAuthenticated();
        return ResponseEntity.ok(authenticated);
    }

    @PostMapping(value = "/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        userService.logout(response);
        return ResponseEntity.noContent().build();
    }
}
