package com.kurth.kurth.entities;

import com.kurth.kurth.entities.enums.NotificationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

@Entity
@Table(name = "tb_notification")
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String notificationTitle;

    @NotNull
    private Instant sentAt;

    @NotNull
    private Boolean isRead = false;

    @Enumerated(EnumType.STRING)
    private NotificationType type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "from_user_id")
    private User fromUser;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "to_user_id")
    private User toUser;

    public Notification(Long id, String notificationTitle, Instant sentAt, Boolean isRead, NotificationType type, Post post, User fromUser, User toUser) {
        this.id = id;
        this.notificationTitle = notificationTitle;
        this.sentAt = sentAt;
        this.isRead = isRead;
        this.type = type;
        this.post = post;
        this.fromUser = fromUser;
        this.toUser = toUser;
    }

    public Notification() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public @NotNull String getNotificationTitle() {
        return notificationTitle;
    }

    public void setNotificationTitle(@NotNull String notificationTitle) {
        this.notificationTitle = notificationTitle;
    }

    public @NotNull Instant getSentAt() {
        return sentAt;
    }

    public void setSentAt(@NotNull Instant sentAt) {
        this.sentAt = sentAt;
    }

    public @NotNull Boolean getRead() {
        return isRead;
    }

    public void setRead(@NotNull Boolean read) {
        isRead = read;
    }

    public NotificationType getType() {
        return type;
    }

    public void setType(NotificationType type) {
        this.type = type;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }

    public User getFromUser() {
        return fromUser;
    }

    public void setFromUser(User fromUser) {
        this.fromUser = fromUser;
    }

    public User getToUser() {
        return toUser;
    }

    public void setToUser(User toUser) {
        this.toUser = toUser;
    }
}
