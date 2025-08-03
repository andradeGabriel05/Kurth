package com.kurth.kurth.services;

import com.kurth.kurth.dto.NotificationDTO;
import com.kurth.kurth.entities.Notification;
import com.kurth.kurth.entities.Post;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.NotificationRepository;
import com.kurth.kurth.repositories.PostRepository;
import com.kurth.kurth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.UUID;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    @Transactional(readOnly = true)
    public Page<NotificationDTO> findAll(Pageable pageable) {
        Page<Notification> notifications = notificationRepository.findAll(pageable);
        return notifications.map(NotificationDTO::new);
    }

    @Transactional(readOnly = true)
    public Page<NotificationDTO> findNotificationByUser(Pageable pageable, UUID id) {
        Page<Notification> notifications = notificationRepository.findAllByUserId(pageable, id);
        return notifications.map(NotificationDTO::new);
    }

    @Transactional
    public NotificationDTO sendNotification(NotificationDTO notificationDTO) {
        Notification notification = new Notification();

        User fromUser = userRepository.getReferenceById(notificationDTO.getFromUser().getId());
        User toUser = userRepository.getReferenceById(notificationDTO.getToUser().getId());
        Post post =  postRepository.getReferenceById(notificationDTO.getPost().getId());

        copyDtoToEntity(notification, notificationDTO);

        notification.setPost(post);
        notification.setFromUser(fromUser);
        notification.setToUser(toUser);

        notificationRepository.save(notification);
        return new NotificationDTO(notification);
    }

    private void copyDtoToEntity(Notification notification, NotificationDTO notificationDTO) {
        notification.setNotificationTitle(notificationDTO.getNotificationTitle());
        notification.setSentAt(Instant.now());
        notification.setType(notificationDTO.getType());
    }
}
