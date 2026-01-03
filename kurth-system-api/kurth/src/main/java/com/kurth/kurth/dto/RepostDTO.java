package com.kurth.kurth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kurth.kurth.entities.Post;
import com.kurth.kurth.entities.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class RepostDTO {
    private Long id;

    private Instant repostedAt;

    private Long repostOfId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private UserDTO user;

    public RepostDTO() {
    }

    public RepostDTO(Long id, Instant repostedAt, Long repostOfId, UserDTO user) {
        this.id = id;
        this.repostedAt = repostedAt;
        this.repostOfId = repostOfId;
        this.user = user;
    }

    public RepostDTO(Post post) {
        this.repostedAt = Instant.now();
        this.repostOfId = post.getId();
        this.user = new UserDTO(post.getUser());
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getRepostedAt() {
        return repostedAt;
    }

    public void setRepostedAt(Instant repostedAt) {
        this.repostedAt = repostedAt;
    }

    public Long getRepostOfId() {
        return repostOfId;
    }

    public void setRepostOfId(Long repostOfId) {
        this.repostOfId = repostOfId;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }
}
