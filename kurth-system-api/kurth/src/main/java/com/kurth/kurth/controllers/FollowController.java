package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.FollowDTO;
import com.kurth.kurth.entities.Follow;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.FollowRepository;
import com.kurth.kurth.services.FollowService;
import com.kurth.kurth.services.exceptions.ResourceNotFoundException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping(value = "/follow")
public class FollowController {

    @Autowired
    private FollowService followService;


    @PostMapping
    public ResponseEntity<FollowDTO> newFollow(@Valid @RequestBody FollowDTO followDTO) {


            followDTO = followService.newFollow(followDTO);

            URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(followDTO.getId()).toUri();

            return ResponseEntity.created(uri).body(followDTO);

    }

    @GetMapping(value = "/checkfollow/{followerId}/{followingId}")
    public FollowDTO userAlreadyFollowing(@PathVariable Long followerId, @PathVariable Long followingId) {

        try {
            System.out.println("Entrou no método userAlreadyFollowing");
            FollowDTO followDTO = followService.userAlreadyFollowing(followerId, followingId);

            if (followDTO == null) {
                throw new ResourceNotFoundException("Relacionamento de follow não encontrado.");
            }

            return followDTO;

        } catch (Exception e) {
            e.printStackTrace();  // Mostra o erro no console
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Erro ao verificar follow", e);
        }
    }


    @DeleteMapping(value = "/remove-follow/{id}")
    public ResponseEntity<Void> removeFollow(@PathVariable Long id) {
        followService.removeFollow(id);
        return ResponseEntity.noContent().build();
    }

}
