package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Reply;
import jakarta.persistence.ManyToOne;

import java.util.HashSet;
import java.util.Set;

public class ReplyDTO {
    private Long id;
    private String text;

    private MessageDTO message;


    private UserDTO user;

    public ReplyDTO(Long id, String text, MessageDTO message, UserDTO user) {
        this.id = id;
        this.text = text;
        this.message = message;
        this.user = user;
    }

    public ReplyDTO(Reply reply) {
        this.id = reply.getId();
        this.text = reply.getText();
        this.message = new MessageDTO(reply.getMessage());
        this.user = new UserDTO(reply.getUser());
    }


    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public MessageDTO getMessage() {
        return message;
    }

    public UserDTO getUser() {
        return user;
    }
}
