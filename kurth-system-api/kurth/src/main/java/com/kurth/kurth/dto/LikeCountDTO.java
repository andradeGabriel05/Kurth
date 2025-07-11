package com.kurth.kurth.dto;

import com.kurth.kurth.entities.LikeCount;

public class LikeCountDTO {

    private Long id;

    private UserDTO user;

    private PostDTO post;

    public LikeCountDTO(Long id, UserDTO user, PostDTO post) {
        this.id = id;
        this.user = user;
        this.post = post;
    }

    public LikeCountDTO() {

    }

    public LikeCountDTO(LikeCount likeCount) {
        this.id = likeCount.getId();
        this.post = new PostDTO(likeCount.getPost());
        this.user = new UserDTO(likeCount.getUser());
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
}
