package com.kurth.kurth.services;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.MessageRepository;
import com.kurth.kurth.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class MessageService {

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public MessageDTO newMessage(MessageDTO messageDTO) {
        Message message = new Message();

        copyDtoToEntity(messageDTO, message);

        User user = userRepository.getReferenceById(messageDTO.getUser().getId());

        message.setUser(user);
        message = messageRepository.save(message);
        return new MessageDTO(message);

    }

    @Transactional(readOnly = true)
    public List<MessageDTO> findAllUserMessages(String username) {
        List<Message> messages = messageRepository.findAllUserMessages(username);
        return messages.stream().map(x -> new MessageDTO(x)).toList();
    }

    @Transactional(readOnly = true)
    public MessageDTO findById(Long id) {
        if(!messageRepository.existsById(id)) {
            throw new EntityNotFoundException("Id user not found");
        }
        Message message = messageRepository.findById(id).get();
        return new MessageDTO(message);
    }

    @Transactional(readOnly = true)
    public Page<MessageDTO> findAll(Pageable pageable) {
        Page<Message> message = messageRepository.findAll(pageable);
        return message.map(x -> new MessageDTO(x));
    }

    @Transactional
    public MessageDTO update(Long id, MessageDTO messageDTO) {
        if(!messageRepository.existsById(id)) {
            throw new EntityNotFoundException("Id message not found");
        }

        Message message = messageRepository.getReferenceById(id);

        copyDtoToEntity(messageDTO, message);

        message = messageRepository.save(message);
        return new MessageDTO(message);
    }

    @Transactional
    public ResponseEntity<Void> delete(Long id) {
        if(!messageRepository.existsById(id)) {
            throw new EntityNotFoundException("Id message not found");
        }

        messageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    private void copyDtoToEntity(MessageDTO messageDTO, Message message) {
        message.setMessage(messageDTO.getMessage());
        message.setPostedAt(messageDTO.getPostedAt());
        message.setImage(messageDTO.getImage());
    }
}
