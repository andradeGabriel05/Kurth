package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Notification;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.entities.enums.NotificationType;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.time.Instant;

public class NotificationDTO {
    private Long id;

    private String notificationTitle;

    private Instant sentAt;

    private Boolean isRead = false;

    private NotificationType type;

    private UserDTO fromUser;

    private UserDTO toUser;

    public NotificationDTO(Long id, String notificationTitle, Instant sentAt, Boolean isRead, NotificationType type, UserDTO fromUser, UserDTO toUser) {
        this.id = id;
        this.notificationTitle = notificationTitle;
        this.sentAt = sentAt;
        this.isRead = isRead;
        this.type = type;
        this.fromUser = fromUser;
        this.toUser = toUser;
    }

    public NotificationDTO(Notification notification) {
        this.id = notification.getId();
        this.notificationTitle = notification.getNotificationTitle();
        this.sentAt = notification.getSentAt();
        this.isRead = notification.getRead();
        this.type = notification.getType();
        this.fromUser = new UserDTO(notification.getFromUser());
        this.toUser = new UserDTO(notification.getToUser());
    }


    public NotificationDTO() {
    }

    public Long getId() {
        return id;
    }

    public String getNotificationTitle() {
        return notificationTitle;
    }

    public Instant getSentAt() {
        return sentAt;
    }

    public Boolean getRead() {
        return isRead;
    }

    public NotificationType getType() {
        return type;
    }

    public UserDTO getFromUser() {
        return fromUser;
    }

    public UserDTO getToUser() {
        return toUser;
    }
}
