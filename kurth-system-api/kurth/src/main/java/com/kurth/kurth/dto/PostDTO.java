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

    private Integer likeCount;

    private Long replyOfId;

    private Long repostOfId;

    private UserDTO user;

    public PostDTO(String message, Instant postedAt, String image, Integer likeCount, Long replyOfId, Long repostOfId, UserDTO user) {
        this.message = message;
        this.postedAt = postedAt;
        this.image = image;
        this.likeCount = likeCount;
        this.replyOfId = replyOfId;
        this.repostOfId = repostOfId;
        this.user = user;
    }

    public PostDTO(Post post) {
        this.id = post.getId();
        this.message = post.getMessage();
        this.postedAt = post.getPostedAt();
        this.image = post.getImage();
        this.likeCount = post.getLikeCount();
        this.user = new UserDTO(post.getUser());

        if (post.getReplyOfId() != null) {
            this.replyOfId = post.getReplyOfId();
        }

        if (post.getRepostOfId() != null) {
            this.repostOfId = post.getRepostOfId();
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

    public UserDTO getUser() {
        return user;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public Long getReplyOfId() {
        return replyOfId;
    }

    public Long getRepostOfId() {
        return repostOfId;
    }
}
