package com.kurth.kurth.entities;

import jakarta.persistence.*;
import org.hibernate.annotations.SQLInsert;
import org.springframework.lang.Nullable;

@Entity
@Table(name = "tb_like_count")
public class LikeCount {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message message;

    public LikeCount(Long id, User user, Message message) {
        this.id = id;
        this.user = user;
        this.message = message;
    }

    public LikeCount() {

    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Message getMessage() {
        return message;
    }

    public void setMessage(Message message) {
        this.message = message;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}
