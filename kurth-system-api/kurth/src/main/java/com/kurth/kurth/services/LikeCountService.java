package com.kurth.kurth.services;

import com.kurth.kurth.dto.LikeCountDTO;
import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.entities.LikeCount;
import com.kurth.kurth.entities.Message;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.LikeCountRepository;
import com.kurth.kurth.repositories.MessageRepository;
import com.kurth.kurth.repositories.UserRepository;
import com.kurth.kurth.services.exceptions.DatabaseException;
import com.kurth.kurth.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class LikeCountService {

    @Autowired
    private LikeCountRepository likeCountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Transactional(readOnly = true)
    public LikeCountDTO findById(Long id) {

        LikeCount likeCount = likeCountRepository.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Resource not found"));

        return new LikeCountDTO(likeCount);
    }

    @Transactional(readOnly = true)
    public Page<LikeCountDTO> findAll(Pageable pageable) {
        Page<LikeCount> likeCount = likeCountRepository.findAll(pageable);
        return likeCount.map(x -> new LikeCountDTO(x));
    }

    @Transactional(readOnly = true)
    public Page<LikeCountDTO> findByUserId(String username, Pageable pageable) {
        Page<LikeCount> likeCounts = likeCountRepository.findByUserId(username, pageable);
        return likeCounts.map(LikeCountDTO::new);
    }

    @Transactional(readOnly = true)
    public Optional<LikeCountDTO> findByUserIdAndMessageId(Long userId, Long messageId) {
        Optional<LikeCount> likeCount = likeCountRepository.findByUserIdAndMessageId(userId, messageId);
        return likeCount.map(LikeCountDTO::new);
    }

    @Transactional
    public LikeCountDTO insertLike(LikeCountDTO likeCountDTO) {
        try {
            Long userId = likeCountDTO.getUser().getId();
            Long messageId = likeCountDTO.getMessage().getId();

            Optional<LikeCount> existingLike = likeCountRepository.findByUserIdAndMessageId(userId, messageId);

            if (existingLike.isPresent()) {
                removeLike(existingLike.get().getId());
                return null;
            }

            LikeCount likeCount = new LikeCount();

            User user = userRepository.getReferenceById(userId);
            Message message = messageRepository.getReferenceById(messageId);

            likeCount.setUser(user);
            likeCount.setMessage(message);


            likeCount = likeCountRepository.save(likeCount);
            return new LikeCountDTO(likeCount);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("[Service] Integrity violation: User may not exist");
        }
    }

    @Transactional
    public LikeCountDTO updateLike(Long id, LikeCountDTO likeCountDTO) {
        LikeCount likeCount = likeCountRepository.getReferenceById(id);

        User user = userRepository.getReferenceById(likeCountDTO.getUser().getId());
        Message message = messageRepository.getReferenceById(likeCountDTO.getMessage().getId());

        likeCount.setUser(user);
        likeCount.setMessage(message);

        likeCount = likeCountRepository.save(likeCount);
        return new LikeCountDTO(likeCount);
    }

    @Transactional (propagation = Propagation.SUPPORTS)
    public void removeLike(Long id) {
        likeCountRepository.deleteById(id);
    }


}
