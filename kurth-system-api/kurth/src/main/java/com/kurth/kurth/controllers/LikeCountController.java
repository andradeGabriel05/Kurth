package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.LikeCountDTO;
import com.kurth.kurth.services.LikeCountService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(value = "/likecount")
public class LikeCountController {

    @Autowired
    private LikeCountService likeCountService;

    @GetMapping(value = "/{id}")
    public LikeCountDTO findById(@PathVariable Long id) {
        return likeCountService.findById(id);
    }

    @GetMapping
    public ResponseEntity<Page<LikeCountDTO>> findAll(Pageable pageable) {
        Page<LikeCountDTO> likeCountDTO = likeCountService.findAll(pageable);
        return ResponseEntity.ok(likeCountDTO);
    }

    @GetMapping("/user/{username}")
    public Page<LikeCountDTO> findByUserId(@PathVariable String username,Pageable pageable) {
        return likeCountService.findByUserId(username, pageable);
    }

    @GetMapping("/user/{userId}/message/{postId}")
    public Optional<LikeCountDTO> findByUserIdAndMessageId(@PathVariable UUID userId, @PathVariable Long postId) {
        return likeCountService.findByUserIdAndMessageId(userId, postId);
    }

    @PostMapping
    public ResponseEntity<LikeCountDTO> insertLike(@Valid @RequestBody LikeCountDTO likeCountDTO) {
        likeCountDTO = likeCountService.insertLike(likeCountDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(likeCountDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(likeCountDTO);
    }

    @PutMapping(value = "/update/{id}")
    public ResponseEntity<LikeCountDTO> updateLike(@PathVariable Long id, @RequestBody LikeCountDTO likeCountDTO) {
        likeCountDTO = likeCountService.updateLike(id, likeCountDTO);
        return ResponseEntity.ok(likeCountDTO);
    }

    @DeleteMapping(value = "/remove/{id}")
    public ResponseEntity<Void> removeLike(@PathVariable Long id) {
        likeCountService.removeLike(id);
        return ResponseEntity.noContent().build();
    }

}
