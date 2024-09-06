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

    @Column(nullable = true)
    private Integer count;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "message_id")
    private Message message;

    public LikeCount(Long id, Integer count, User user, Message message) {
        this.id = id;
        this.count = count;
        this.user = user;
        this.message = message;
    }

    public LikeCount() {

    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
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
