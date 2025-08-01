package com.kurth.kurth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kurth.kurth.entities.Post;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PostDTO {

    private Long id;

    @Size(max = 280, message = "The message must have a maximum of 280 characters.")
    @NotBlank(message = "Message cannot be null.")
    private String message;

    private Instant postedAt;

    private String image;

    private Boolean isReply;

    private Integer likeCount;

    private PostDTO parent;

    private UserDTO user;

    public PostDTO(Long id, String message, Instant postedAt, String image, Boolean isReply, Integer likeCount, PostDTO parent, UserDTO user) {
        this.id = id;
        this.message = message;
        this.postedAt = postedAt;
        this.image = image;
        this.isReply = isReply;
        this.likeCount = likeCount;
        this.parent = parent;
        this.user = user;
    }

    public PostDTO(Post post) {
        this.id = post.getId();
        this.message = post.getMessage();
        this.postedAt = post.getPostedAt();
        this.image = post.getImage();
        this.likeCount = post.getLikeCount();
        this.isReply = post.getReply();
        this.user = new UserDTO(post.getUser());
        if (post.getParent() != null) {
            this.parent = new PostDTO(post.getParent());
        }
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public Instant getPostedAt() {
        return postedAt;
    }

    public String getImage() {
        return image;
    }

    public Boolean getReply() {
        return isReply;
    }

    public PostDTO getParent() {
        return parent;
    }

    public UserDTO getUser() {
        return user;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

}
