package com.kurth.kurth.dto;

import com.kurth.kurth.entities.LikeCount;
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

    public LikeCountDTO(LikeCount likeCount) {
        this.id = likeCount.getId();
        this.count = likeCount.getCount();
        this.message = likeCount.getMessage();
        this.user = likeCount.getUser();
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
