package com.kurth.kurth.services;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.MessageRepository;
import com.kurth.kurth.repositories.UserRepository;
import com.kurth.kurth.services.exceptions.DatabaseException;
import com.kurth.kurth.services.exceptions.ResourceNotFoundException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
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

    @Transactional(readOnly = true)
    public Page<MessageDTO> findAllUserMessages(String username, Pageable pageable) {
        Page<Message> messages = messageRepository.findAllUserMessages(username, pageable);
        return messages.map(x -> new MessageDTO(x));
    }

    @Transactional(readOnly = true)
    public List<MessageDTO> findAllMessagesWithImage() {
        List<Message> messages = messageRepository.findAllMessagesWithImage();
        return messages.stream().map(x -> new MessageDTO(x)).toList();
    }

    @Transactional(readOnly = true)
    public Page<MessageDTO> findAllUserFollowingMessages(Pageable pageable, Long followerId) {
        Page<Message> messages = messageRepository.findAllUserFollowingMessages(pageable, followerId);
        return messages.map(MessageDTO::new);
    }

    @Transactional(readOnly = true)
    public MessageDTO findById(Long id) {

        Message message = messageRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        return new MessageDTO(message);
    }

    @Transactional(readOnly = true)
    public Page<MessageDTO> findAll(Pageable pageable) {
        Page<Message> message = messageRepository.findAll(pageable);
        return message.map(x -> new MessageDTO(x));
    }


    @Transactional
    public MessageDTO newMessage(MessageDTO messageDTO) {

        try {
            Message message = new Message();

            copyDtoToEntity(messageDTO, message);

            User user = userRepository.getReferenceById(messageDTO.getUser().getId());

            message.setUser(user);
            message = messageRepository.save(message);
            return new MessageDTO(message);
        } catch (DataIntegrityViolationException e) {
                throw new DatabaseException("[Service] Integrity violation: User may not exist");
            }
    }

    @Transactional
    public MessageDTO update(Long id, MessageDTO messageDTO) {
        if(!messageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }
        Message message = messageRepository.getReferenceById(id);

        copyDtoToEntity(messageDTO, message);

        message = messageRepository.save(message);
        return new MessageDTO(message);
    }

    @Transactional
    public ResponseEntity<Void> delete(Long id) {
        if(!messageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }
        try {

        messageRepository.deleteById(id);
        return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Resource not found");
        }

    }

    @Transactional
    public MessageDTO updateLikeCount(Long id) {
        if(!messageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }

        messageRepository.updateLikeCount(id);

        Message updatedMessage = messageRepository.getReferenceById(id);
        return new MessageDTO(updatedMessage);
    }

    @Transactional
    public MessageDTO removeLike(Long id) {
        if(!messageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }

        messageRepository.removeLike(id);

        Message updatedMessage = messageRepository.getReferenceById(id);
        return new MessageDTO(updatedMessage);
    }

    private void copyDtoToEntity(MessageDTO messageDTO, Message message) {
        message.setMessage(messageDTO.getMessage());
        message.setPostedAt(messageDTO.getPostedAt());
        message.setImage(messageDTO.getImage());
        message.setLikeCount(messageDTO.getLikeCount());
    }
}
