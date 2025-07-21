package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Notification;
import com.kurth.kurth.entities.enums.NotificationType;

import java.time.Instant;

public class NotificationDTO {
    private Long id;

    private String notificationTitle;

    private Instant sentAt;

    private Boolean isRead = false;

    private NotificationType type;

    private PostDTO post;

    private UserDTO fromUser;

    private UserDTO toUser;

    public NotificationDTO(Long id, String notificationTitle, Instant sentAt, Boolean isRead, NotificationType type, PostDTO post, UserDTO fromUser, UserDTO toUser) {
        this.id = id;
        this.notificationTitle = notificationTitle;
        this.sentAt = sentAt;
        this.isRead = isRead;
        this.type = type;
        this.post = post;
        this.fromUser = fromUser;
        this.toUser = toUser;
    }

    public NotificationDTO(Notification notification) {
        id = notification.getId();
        notificationTitle = notification.getNotificationTitle();
        sentAt = notification.getSentAt();
        isRead = notification.getRead();
        type = notification.getType();
        post = new PostDTO(notification.getPost());
        fromUser = new UserDTO(notification.getFromUser());
        toUser = new UserDTO(notification.getToUser());
    }


    public NotificationDTO() {
    }

    public Long getId() {
        return id;
    }

    public String getNotificationTitle() {
        return notificationTitle;
    }

    public NotificationType getType() {
        return type;
    }

    public PostDTO getPost() {
        return post;
    }

    public UserDTO getFromUser() {
        return fromUser;
    }

    public UserDTO getToUser() {
        return toUser;
    }
}
