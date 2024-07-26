package com.kurth.kurth.entities;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.dto.UserDTO;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table(name = "tb_reply")
public class Reply {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private Instant postedAt;

    private String image;

    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message messageId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Message getMessageId() {
        return messageId;
    }

    public void setMessageId(Message message) {
        this.messageId = message;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Instant getPostedAt() {
        return postedAt;
    }

    public void setPostedAt(Instant postedAt) {
        this.postedAt = postedAt;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
