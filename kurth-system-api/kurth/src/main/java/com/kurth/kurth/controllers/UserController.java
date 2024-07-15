package com.kurth.kurth.controllers;


import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.services.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<UserDTO> insert(@RequestBody UserDTO userDTO) {
        userDTO = userService.newUser(userDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(userDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(userDTO);

    }

    @GetMapping(value = "/{id}")
    public UserDTO findById(@PathVariable Long id) {
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

    @PutMapping(value = "/{id}")
    public ResponseEntity<UserDTO> update(@PathVariable Long id,@RequestBody UserDTO userDTO) {
        userDTO = userService.update(id, userDTO);
        return ResponseEntity.ok(userDTO);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }


}
