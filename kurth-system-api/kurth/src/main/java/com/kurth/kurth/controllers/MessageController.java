package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.services.MessageService;
import com.kurth.kurth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageDTO> insert(@RequestBody MessageDTO messageDTO) {
        messageDTO = messageService.messageInsert(messageDTO);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(messageDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(messageDTO);
    }
}
