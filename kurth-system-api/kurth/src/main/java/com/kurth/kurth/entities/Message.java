package com.kurth.kurth.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

@Entity
@Table(name = "tb_messages")
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String message;

    private Instant sentAt;

    @ManyToOne
    @JoinColumn(name = "sent_by_id")
    private User sentByUser;

    @ManyToOne
    @JoinColumn(name = "sent_to_id")
    private User sentToUser;

    public Message() {
    }

    public Message(Long id, String message, Instant sentAt, User sentByUser, User sentToUser) {
        this.id = id;
        this.message = message;
        this.sentAt = sentAt;
        this.sentByUser = sentByUser;
        this.sentToUser = sentToUser;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull String getMessage() {
        return message;
    }

    public void setMessage(@NotNull String message) {
        this.message = message;
    }

    public Instant getSentAt() {
        return sentAt;
    }

    public void setSentAt(Instant sentAt) {
        this.sentAt = sentAt;
    }

    public User getSentByUser() {
        return sentByUser;
    }

    public void setSentByUser(User sentByUser) {
        this.sentByUser = sentByUser;
    }

    public User getSentToUser() {
        return sentToUser;
    }

    public void setSentToUser(User sentToUser) {
        this.sentToUser = sentToUser;
    }
}
