package com.kurth.kurth.services;

import com.kurth.kurth.dto.LikeCountDTO;
import com.kurth.kurth.entities.LikeCount;
import com.kurth.kurth.entities.Post;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.LikeCountRepository;
import com.kurth.kurth.repositories.PostRepository;
import com.kurth.kurth.repositories.UserRepository;
import com.kurth.kurth.services.exceptions.DatabaseException;
import com.kurth.kurth.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class LikeCountService {

    @Autowired
    private LikeCountRepository likeCountRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

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
    public Optional<LikeCountDTO> findByUserIdAndMessageId(Long userId, Long postId) {
        Optional<LikeCount> likeCount = likeCountRepository.findByUserIdAndPostId(userId, postId);
        return likeCount.map(LikeCountDTO::new);
    }

    @Transactional
    public LikeCountDTO insertLike(LikeCountDTO likeCountDTO) {
        try {
            Long userId = likeCountDTO.getUser().getId();
            Long postId = likeCountDTO.getPost().getId();

            Optional<LikeCount> existingLike = likeCountRepository.findByUserIdAndPostId(userId, postId);

            if (existingLike.isPresent()) {
                removeLike(existingLike.get().getId());
                return null;
            }

            LikeCount likeCount = new LikeCount();

            User user = userRepository.getReferenceById(userId);
            Post post = postRepository.getReferenceById(postId);

            likeCount.setUser(user);
            likeCount.setPost(post);


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
        Post post = postRepository.getReferenceById(likeCountDTO.getPost().getId());

        likeCount.setUser(user);
        likeCount.setPost(post);

        likeCount = likeCountRepository.save(likeCount);
        return new LikeCountDTO(likeCount);
    }

    @Transactional (propagation = Propagation.SUPPORTS)
    public void removeLike(Long id) {
        likeCountRepository.deleteById(id);
    }


}
