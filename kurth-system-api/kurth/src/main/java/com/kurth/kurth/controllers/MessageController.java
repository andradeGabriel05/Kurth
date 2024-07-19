package com.kurth.kurth.controllers;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.services.MessageService;
import com.kurth.kurth.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping(value = "/message")
public class MessageController {

    @Autowired
    private MessageService messageService;


    @GetMapping(value = "/{id}")
    public MessageDTO findById(@PathVariable Long id) {
        return messageService.findById(id);
    }

    @GetMapping
    public ResponseEntity<Page<MessageDTO>> findAll(Pageable pageable) {
        Page<MessageDTO> messageDTO = messageService.findAll(pageable);
        return ResponseEntity.ok(messageDTO);
    }


    @GetMapping(value = "/user_messages/{username}")
    public List<MessageDTO> findAllUserMessages(@PathVariable String username) {
        return messageService.findAllUserMessages(username);
    }

    @PostMapping
    public ResponseEntity<MessageDTO> insert(@Valid @RequestBody MessageDTO messageDTO) {
        messageDTO = messageService.newMessage(messageDTO);

        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(messageDTO.getId()).toUri();
        return ResponseEntity.created(uri).body(messageDTO);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<MessageDTO> update(@PathVariable Long id, @RequestBody MessageDTO messageDTO) {
        messageDTO = messageService.update(id, messageDTO);
        return ResponseEntity.ok(messageDTO);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        messageService.delete(id);
        return ResponseEntity.noContent().build();
    }



}
