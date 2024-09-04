package com.kurth.kurth.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_message")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String message;

    private Instant postedAt;

    private String image;

    @Column(name = "like_count")
    private Integer likeCount;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Message() {}

    public Message(Long id, String message, Instant postedAt, String image, User user) {
        this.id = id;
        this.message = message;
        this.postedAt = postedAt;
        this.image = image;
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
}
