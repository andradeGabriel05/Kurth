package com.kurth.kurth.dto;

import com.kurth.kurth.entities.LikeCount;

import java.time.Instant;

public class LikeCountDTO {

    private Long id;

    private UserDTO user;

    private PostDTO post;

    private Instant likedAt;

    public LikeCountDTO(Long id, UserDTO user, PostDTO post, Instant likedAt) {
        this.id = id;
        this.user = user;
        this.post = post;
        this.likedAt = likedAt;
    }

    public LikeCountDTO() {

    }

    public LikeCountDTO(LikeCount likeCount) {
        this.id = likeCount.getId();
        this.post = new PostDTO(likeCount.getPost());
        this.user = new UserDTO(likeCount.getUser());
        this.likedAt = likeCount.getLikedAt();
    }

    public UserDTO getUser() {
        return user;
    }

    public PostDTO getPost() {
        return post;
    }

    public Long getId() {
        return id;
    }

    public Instant getLikedAt() {
        return likedAt;
    }
}
