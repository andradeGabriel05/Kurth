package com.kurth.kurth.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.type.descriptor.jdbc.TinyIntJdbcType;

import java.time.Instant;

@Entity
@Table(name = "tb_post", indexes = {
        @Index(name = "idx_user_id", columnList = "user_id"),
        @Index(name = "idx_parent_id", columnList = "parent_id")
})
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    @NotBlank
    private String message;

    private Instant postedAt;

    private String image;

    private Boolean isReply;

    @Column(name = "like_count")
    private Integer likeCount;

    @ManyToOne
    @JoinColumn(name = "parent_id")
    private Post parent;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;


    public Post() {}

    public Post(Long id, String message, Instant postedAt, String image, Boolean isReply, Integer likeCount, Post parent, User user) {
        this.id = id;
        this.message = message;
        this.postedAt = postedAt;
        this.image = image;
        this.isReply = isReply;
        this.likeCount = likeCount;
        this.parent = parent;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Instant getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(Instant postedAt) {
        this.postedAt = postedAt;
    }

    public Boolean getReply() {
        return isReply;
    }

    public void setReply(Boolean reply) {
        isReply = reply;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

    public void setLikeCount(Integer likeCount) {
        this.likeCount = likeCount;
    }

    public Post getParent() {
        return parent;
    }

    public void setParent(Post parent) {
        this.parent = parent;
    }
}
