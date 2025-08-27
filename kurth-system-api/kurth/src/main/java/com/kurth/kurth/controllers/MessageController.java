package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.services.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@Controller
public class MessageController {

    @Autowired
    private MessageService messageService;

    @MessageMapping("/chat.send")
    @SendTo("/topic/public")
    public MessageDTO sendMessage(@Payload MessageDTO messageDTO) {
        return messageService.sendMessage(messageDTO);
    }

    @MessageMapping("/add-user")
    @SendTo("/topic/public")
    public ResponseEntity<MessageDTO> addUser(@Payload MessageDTO messageDTO, SimpMessageHeaderAccessor headerAccessor) {
        headerAccessor.getSessionAttributes().put("username", messageDTO.getSentByUser());
        return ResponseEntity.ok().body(messageService.sendMessage(messageDTO));
    }
}
