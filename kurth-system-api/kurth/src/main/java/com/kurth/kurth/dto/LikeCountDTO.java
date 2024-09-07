package com.kurth.kurth.dto;

import com.kurth.kurth.entities.LikeCount;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import jakarta.persistence.*;

import java.time.Instant;
import java.util.List;

public class LikeCountDTO {

    private Long id;

    private UserDTO user;

    private MessageDTO message;

    public LikeCountDTO(Long id, UserDTO user, MessageDTO message) {
        this.id = id;
        this.user = user;
        this.message = message;
    }

    public LikeCountDTO() {

    }

    public LikeCountDTO(LikeCount likeCount) {
        this.id = likeCount.getId();
        this.message = new MessageDTO(likeCount.getMessage());
        this.user = new UserDTO(likeCount.getUser());
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
