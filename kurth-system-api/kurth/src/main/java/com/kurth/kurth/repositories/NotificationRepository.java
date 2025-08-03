package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT obj FROM Notification obj WHERE obj.toUser.id = :userId")
    Page<Notification> findAllByUserId(Pageable pageable, UUID userId);
}

