package com.kurth.kurth.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kurth.kurth.entities.Message;
import jakarta.validation.constraints.NotBlank;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageDTO {
    private Long id;

    @NotBlank(message = "Message cannot be null.")
    private String message;

    private UserDTO sentByUser;

    private UserDTO sentToUser;


    public MessageDTO(Long id, String message, UserDTO sentByUser, UserDTO sentToUser) {
        this.id = id;
        this.message = message;
        this.sentByUser = sentByUser;
        this.sentToUser = sentToUser;
    }

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.message = message.getMessage();
        this.sentByUser = new UserDTO(message.getSentByUser());
        this.sentToUser = new UserDTO(message.getSentToUser());
    }


    public MessageDTO() {}

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public UserDTO getSentByUser() {
        return sentByUser;
    }

    public UserDTO getSentToUser() {
        return sentToUser;
    }
}
