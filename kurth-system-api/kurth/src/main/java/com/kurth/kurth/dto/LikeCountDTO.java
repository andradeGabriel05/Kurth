package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import jakarta.persistence.*;

import java.time.Instant;

public class LikeCountDTO {

    private Long id;

    private Integer count;

    private User user;

    private Message message;

    public LikeCountDTO(Long id, Integer count, User user, Message message) {
        this.id = id;
        this.count = count;
        this.user = user;
        this.message = message;
    }

    public LikeCountDTO() {

    }

    public int getCount() {
        return count;
    }

    public User getUser() {
        return user;
    }

    public Message getMessage() {
        return message;
    }

    public Long getId() {
        return id;
    }
}
