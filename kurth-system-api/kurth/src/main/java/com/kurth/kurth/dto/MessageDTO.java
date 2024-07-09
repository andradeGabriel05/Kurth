package com.kurth.kurth.dto;

import com.kurth.kurth.entities.User;
import jakarta.persistence.*;

import java.time.Instant;

public class MessageDTO {

    private Long id;

    private String message;

    private Instant postedAt;

    private String image;

    private User user;

    public MessageDTO(Long id, String message, Instant postedAt, String image, User user) {
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

    public Instant getPostedAt() {
        return postedAt;
    }

    public String getImage() {
        return image;
    }

    public User getUser() {
        return user;
    }
}
