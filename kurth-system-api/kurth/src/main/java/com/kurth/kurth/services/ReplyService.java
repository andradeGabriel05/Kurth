package com.kurth.kurth.services;

import com.kurth.kurth.dto.ReplyDTO;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.Reply;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.MessageRepository;
import com.kurth.kurth.repositories.ReplyRepository;
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

@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;
    @Autowired
    private MessageRepository messageRepository;
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public ReplyDTO findById(Long id) {
        Reply reply = replyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        return new ReplyDTO(reply);
    }

    @Transactional(readOnly = true)
    public Page<ReplyDTO> findAll(Pageable pageable) {
        Page<Reply> replies = replyRepository.findAll(pageable);
        return replies.map(rep -> new ReplyDTO(rep));
    }

    @Transactional(readOnly = true)
    public Page<ReplyDTO> findAllByMessageId(Long id, Pageable pageable) {
        Page<Reply> replies = replyRepository.findAllByMessageId(id, pageable);
        return replies.map(rep -> new ReplyDTO(rep));
    }

    @Transactional
    public ReplyDTO newReply(ReplyDTO replyDTO) {

        Reply reply = new Reply();

        reply.setMessage(replyDTO.getMessage());
        reply.setImage(replyDTO.getImage());
        reply.setPostedAt(replyDTO.getPostedAt());

        Message message = messageRepository.findById(replyDTO.getMessageId()).orElseThrow(() -> new DatabaseException("[Service] User not found"));
        User user = userRepository.getReferenceById(replyDTO.getUser().getId());

        reply.setMessageId(message);
        reply.setUser(user);
        reply = replyRepository.save(reply);

        return new ReplyDTO(reply);
    }

    @Transactional
    public ReplyDTO updateReply(Long id, ReplyDTO replyDTO) {
        if(!messageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }

        Reply reply = replyRepository.getReferenceById(id);

        reply.setMessage(replyDTO.getMessage());
        reply.setImage(replyDTO.getImage());
        reply.setPostedAt(replyDTO.getPostedAt());

        Message message = messageRepository.findById(replyDTO.getMessageId()).orElseThrow(() -> new DatabaseException("[Service] User not found"));
        User user = userRepository.getReferenceById(replyDTO.getUser().getId());

        reply.setMessageId(message);
        reply.setUser(user);
        reply = replyRepository.save(reply);

        return new ReplyDTO(reply);
    }

    @Transactional
    public ResponseEntity<Void> deleteReply(Long id) {
        if(!messageRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }
        try {
            replyRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Resource not found");
        }
    }

}
