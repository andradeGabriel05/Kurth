package com.kurth.kurth.services;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.MessageRepository;
import com.kurth.kurth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public MessageDTO sendMessage(MessageDTO messageDTO) {
        Message message = new Message();

        message.setMessage(messageDTO.getMessage());
        message.setSentAt(Instant.now());

        User sentByUser = userRepository.getReferenceById(messageDTO.getSentByUser().getId());

        User sentToUser = userRepository.getReferenceById(messageDTO.getSentToUser().getId());

        message.setSentByUser(sentByUser);
        message.setSentToUser(sentToUser);

        messageRepository.save(message);
        return new MessageDTO(message);
    }

    @Transactional(readOnly = true)
    public Page<MessageDTO> getMessages(Pageable pageable, UUID uuid) {
       return messageRepository.findBySentToUser(pageable, uuid);
    }
}

