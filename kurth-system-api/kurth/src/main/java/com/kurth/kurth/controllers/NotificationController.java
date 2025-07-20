package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.NotificationDTO;
import com.kurth.kurth.dto.PostDTO;
import com.kurth.kurth.services.NotificationService;
import com.kurth.kurth.services.PostService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/notification")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public ResponseEntity<Page<NotificationDTO>> getAllNotifications(Pageable pageable) {
        Page<NotificationDTO> notificationDTO = notificationService.findAll(pageable);
        return ResponseEntity.ok(notificationDTO);
    }

    @PostMapping
    public ResponseEntity<NotificationDTO> insert(@Valid @RequestBody NotificationDTO notificationDTO) {
        notificationDTO = notificationService.sendNotification(notificationDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(notificationDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(notificationDTO);
    }
}
