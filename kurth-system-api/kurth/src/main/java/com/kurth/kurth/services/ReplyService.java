package com.kurth.kurth.services;

import com.kurth.kurth.dto.ReplyDTO;
import com.kurth.kurth.entities.Reply;
import com.kurth.kurth.repositories.ReplyRepository;
import com.kurth.kurth.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ReplyService {

    @Autowired
    private ReplyRepository replyRepository;

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

}
