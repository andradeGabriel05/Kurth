package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Message;

import java.time.Instant;
import java.time.LocalDate;

public class MessageDTO {

    private Long id;

    private String message;

    private LocalDate postedAt;

    private String image;

    private UserDTO user;

    public MessageDTO(Long id, String message, LocalDate postedAt, String image, UserDTO user) {
        this.id = id;
        this.message = message;
        this.postedAt = postedAt;
        this.image = image;
        this.user = user;
    }

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.message = message.getMessage();
        this.postedAt = message.getPostedAt();
        this.image = message.getImage();
        this.user = new UserDTO(message.getUser());
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public LocalDate getPostedAt() {
        return postedAt;
    }

    public String getImage() {
        return image;
    }

    public UserDTO getUser() {
        return user;
    }
}
