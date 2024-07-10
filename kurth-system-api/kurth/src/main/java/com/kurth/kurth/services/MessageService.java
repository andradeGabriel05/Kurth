package com.kurth.kurth.services;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.MessageRepository;
import com.kurth.kurth.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public MessageDTO messageInsert(MessageDTO messageDTO) {
        Message message = new Message();

        message.setMessage(messageDTO.getMessage());
        message.setPostedAt(messageDTO.getPostedAt());
        message.setImage(messageDTO.getImage());

        User user = userRepository.getReferenceById(messageDTO.getUser().getId());

        message.setUser(user);
        message = messageRepository.save(message);
        return new MessageDTO(message);

    }
}
