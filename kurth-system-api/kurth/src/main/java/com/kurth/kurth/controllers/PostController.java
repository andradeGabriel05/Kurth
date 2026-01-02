package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.feed.FeedPostDTO;
import com.kurth.kurth.dto.PostDTO;
import com.kurth.kurth.services.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.URI;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping(value = "/message")
public class PostController {

    @Autowired
    private PostService postService;


    @GetMapping(value = "/{id}")
    public PostDTO findById(@PathVariable Long id) {
        return postService.findById(id);
    }

    @GetMapping
    public ResponseEntity<Page<FeedPostDTO>> findAll(Pageable pageable) {
        Page<FeedPostDTO> messageDTO = postService.findAll(pageable);
        return ResponseEntity.ok(messageDTO);
    }

    @GetMapping(value = "/user_messages/{username}")
    public Page<PostDTO> findAllUserMessages(@PathVariable String username, Pageable pageable) {
        return postService.findAllUserMessages(username, pageable);
    }

    @GetMapping(value = "/images-details")
    public List<PostDTO> findAllMessagesWithImage() {
        return postService.findAllMessagesWithImage();
    }

    @GetMapping(value ="/user-following-messages/{followerId}")
    public Page<PostDTO> findAllUserFollowingMessages(Pageable pageable, @PathVariable UUID followerId) {
        return postService.findAllUserFollowingMessages(pageable, followerId);
    }

    @GetMapping("/reply/message-count/{id}")
    public Integer countReplyMessages(@PathVariable Long id) {
        return postService.countReplyMessages(id);
    }

    @GetMapping("/find-replies/{id}")
    public Page<PostDTO> findReplies(Pageable pageable,@PathVariable Long id) {
        return postService.findReplies(pageable, id);
    }


    @PostMapping
    public ResponseEntity<PostDTO> insert(@Valid  @RequestBody PostDTO postDTO) {
        postDTO = postService.newMessage(postDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(postDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(postDTO);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> saveImage(@RequestPart("image") MultipartFile file) throws IOException {
        System.out.println(file);
        String filename = postService.saveImage(file);
        String url = "uploads/" + filename;

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(url).toUri();
        return ResponseEntity.created(uri).body(url);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<PostDTO> update(@PathVariable Long id, @RequestBody PostDTO postDTO) {
        postDTO = postService.update(id, postDTO);
        return ResponseEntity.ok(postDTO);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        postService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping(value = "/{id}/like-count")
    public ResponseEntity<PostDTO> updateLikeCount(@PathVariable Long id) {
        PostDTO postDTO = postService.updateLikeCount(id);
        return ResponseEntity.ok(postDTO);
    }

    @PutMapping(value = "/{id}/like-count-removing")
    public ResponseEntity<PostDTO> removeLike(@PathVariable Long id) {
        PostDTO postDTO = postService.removeLike(id);
        return ResponseEntity.ok(postDTO);
    }




}
