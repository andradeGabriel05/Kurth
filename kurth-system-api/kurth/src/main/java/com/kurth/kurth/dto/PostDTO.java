package com.kurth.kurth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kurth.kurth.entities.Post;
import com.kurth.kurth.entities.Repost;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.util.List;

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

    private List<Repost> reposts;

    private UserDTO user;

    public PostDTO(UserDTO user, List<Repost> reposts, Long replyOfId, Integer likeCount, String image, Instant postedAt, String message) {
        this.user = user;
        this.reposts = reposts;
        this.replyOfId = replyOfId;
        this.likeCount = likeCount;
        this.image = image;
        this.postedAt = postedAt;
        this.message = message;
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

    public List<Repost> getReposts() {
        return reposts;
    }
}
