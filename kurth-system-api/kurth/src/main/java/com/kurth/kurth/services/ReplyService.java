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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

        reply.setText(replyDTO.getText());
        Message message = messageRepository.findById(replyDTO.getMessageId()).orElseThrow(() -> new DatabaseException("[Service] User not found"));
        User user = userRepository.findById(replyDTO.getUserId()).orElseThrow(() -> new DatabaseException("[Service] Message not found"));;

        reply.setMessage(message);
         reply.setUser(user);
        reply = replyRepository.save(reply);

        return new ReplyDTO(reply);
    }

}
