package com.kurth.kurth.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import org.hibernate.type.descriptor.jdbc.TinyIntJdbcType;

import java.time.Instant;
import java.util.List;

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

    private Integer likeCount;

    private Long replyOfId;

    @OneToMany(mappedBy = "repostOf")
    private List<Repost> reposts;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Post() {}

    public Post(Long id, String message, Instant postedAt, String image, Integer likeCount, Long replyOfId, List<Repost> reposts, User user) {
        this.id = id;
        this.message = message;
        this.postedAt = postedAt;
        this.image = image;
        this.likeCount = likeCount;
        this.replyOfId = replyOfId;
        this.reposts = reposts;
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

    public Long getReplyOfId() {
        return replyOfId;
    }

    public void setReplyOfId(Long replyOfId) {
        this.replyOfId = replyOfId;
    }

    public List<Repost> getReposts() {
        return reposts;
    }

    public void setReposts(List<Repost> reposts) {
        this.reposts = reposts;
    }
}
