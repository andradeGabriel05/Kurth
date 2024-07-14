package com.kurth.kurth.services;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.MessageRepository;
import com.kurth.kurth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public MessageDTO newMessage(MessageDTO messageDTO) {
        Message message = new Message();

        message.setMessage(messageDTO.getMessage());
        message.setPostedAt(messageDTO.getPostedAt());
        message.setImage(messageDTO.getImage());

        User user = userRepository.getReferenceById(messageDTO.getUser().getId());

        message.setUser(user);
        message = messageRepository.save(message);
        return new MessageDTO(message);

    }

    @Transactional(readOnly = true)
    public MessageDTO findById(Long id) {
        Message message = messageRepository.findById(id).get();
        return new MessageDTO(message);
    }

    public Page<MessageDTO> findAll(Pageable pageable) {
        Page<Message> message = messageRepository.findAll(pageable);
        return message.map(x -> new MessageDTO(x));
    }
}
