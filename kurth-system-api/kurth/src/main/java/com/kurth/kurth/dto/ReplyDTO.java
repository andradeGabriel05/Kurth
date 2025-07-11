package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Reply;

import java.time.Instant;

public class ReplyDTO {
    private Long id;
    private String message;

    private Instant postedAt;
    private String image;

    private Long postId;
    private UserDTO user;

    public ReplyDTO(Long id, String message, Long postId, UserDTO user) {
        this.id = id;
        this.message = message;
        this.postId = postId;
        this.user = user;
    }

    public ReplyDTO(Reply reply) {
        this.id = reply.getId();
        this.message = reply.getMessage();
        this.postedAt = reply.getPostedAt();
        this.image = reply.getImage();
        this.postId = reply.getPostId().getId();
        this.user = new UserDTO(reply.getUser());
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public Long getMessageId() {
        return postId;
    }

    public UserDTO getUser() {
        return user;
    }

    public Instant getPostedAt() {
        return postedAt;
    }

    public String getImage() {
        return image;
    }
}
