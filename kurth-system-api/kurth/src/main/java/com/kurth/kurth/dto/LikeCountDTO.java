package com.kurth.kurth.dto;

import com.kurth.kurth.entities.LikeCount;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;

public class LikeCountDTO {

    private Long id;

    private Integer count;

    private UserDTO user;

    private MessageDTO message;

    public LikeCountDTO(Long id, Integer count, UserDTO user, MessageDTO message) {
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
        this.message = new MessageDTO(likeCount.getMessage());
        this.user = new UserDTO(likeCount.getUser());
    }

    public Integer getCount() {
        return count;
    }

    public UserDTO getUser() {
        return user;
    }

    public MessageDTO getMessage() {
        return message;
    }

    public Long getId() {
        return id;
    }
}
