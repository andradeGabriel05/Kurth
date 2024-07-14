package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.services.MessageService;
import com.kurth.kurth.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping(value = "/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping
    public ResponseEntity<MessageDTO> insert(@RequestBody MessageDTO messageDTO) {
        messageDTO = messageService.newMessage(messageDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(messageDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(messageDTO);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping(value = "/{id}")
    public MessageDTO findById(@PathVariable Long id) {
        return messageService.findById(id);
    }

    @GetMapping
    public ResponseEntity<Page<MessageDTO>> findAll(Pageable pageable) {
        Page<MessageDTO> messageDTO = messageService.findAll(pageable);
        return ResponseEntity.ok(messageDTO);
    }
}
