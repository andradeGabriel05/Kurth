package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Reply;
import jakarta.persistence.ManyToOne;

import java.util.HashSet;
import java.util.Set;

public class ReplyDTO {
    private Long id;
    private String text;

    private Long messageId;
    private Long userId;

    public ReplyDTO(Long id, String text, Long messageId, Long userId) {
        this.id = id;
        this.text = text;
        this.messageId = messageId;
        this.userId = userId;
    }

    public ReplyDTO(Reply reply) {
        this.id = reply.getId();
        this.text = reply.getText();
        this.messageId = reply.getMessage().getId();
        this.userId = reply.getUser().getId();
    }

    public Long getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public Long getMessageId() {
        return messageId;
    }

    public Long getUserId() {
        return userId;
    }
}
