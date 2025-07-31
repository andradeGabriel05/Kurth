package com.kurth.kurth.services;

import com.kurth.kurth.dto.PostDTO;
import com.kurth.kurth.entities.Post;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.PostRepository;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Page<PostDTO> findAllUserMessages(String username, Pageable pageable) {
        Page<Post> messages = postRepository.findAllUserMessages(username, pageable);
        return messages.map(x -> new PostDTO(x));
    }

    @Transactional(readOnly = true)
    public List<PostDTO> findAllMessagesWithImage() {
        List<Post> posts = postRepository.findAllMessagesWithImage();
        return posts.stream().map(x -> new PostDTO(x)).toList();
    }

    @Transactional(readOnly = true)
    public Page<PostDTO> findAllUserFollowingMessages(Pageable pageable, Long followerId) {
        Page<Post> messages = postRepository.findAllUserFollowingMessages(pageable, followerId);
        return messages.map(PostDTO::new);
    }

    @Transactional(readOnly = true)
    public Integer countReplyMessages(Long id) {
        return postRepository.countReplyMessages(id);
    }

    @Transactional(readOnly = true)
    public PostDTO findById(Long id) {

        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Resource not found"));

        return new PostDTO(post);
    }

    @Transactional(readOnly = true)
    public Page<PostDTO> findAll(Pageable pageable) {
        Page<Post> message = postRepository.findAll(pageable);
        return message.map(x -> new PostDTO(x));
    }


    @Transactional
    public PostDTO newMessage(PostDTO postDTO) {

        try {
            Post post = new Post();

            copyDtoToEntity(postDTO, post);
            User user = userRepository.getReferenceById(postDTO.getUser().getId());
            if(postDTO.getParent() != null) {
                System.out.printf("teste: ", postDTO);
                Post parent = postRepository.getReferenceById(postDTO.getParent().getId());
                post.setParent(parent);
            }

            post.setUser(user);
            post.setPostedAt(Instant.now());
            post = postRepository.save(post);
            return new PostDTO(post);
        } catch (DataIntegrityViolationException e) {
                throw new DatabaseException("[Service] Integrity violation: User may not exist");
            }
    }

    @Transactional
    public String saveImage(MultipartFile file) throws IOException {
        String filename = UUID.randomUUID() + "-" + file.getOriginalFilename();
        Path dir = Paths.get("uploads");
        Files.createDirectories(dir);
        Path path = dir.resolve(filename);
        Files.copy(file.getInputStream(), path);
        return filename;

    }

    @Transactional
    public PostDTO update(Long id, PostDTO postDTO) {
        if(!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }
        Post post = postRepository.getReferenceById(id);

        copyDtoToEntity(postDTO, post);

        post = postRepository.save(post);
        return new PostDTO(post);
    }

    @Transactional
    public ResponseEntity<Void> delete(Long id) {
        if(!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }
        try {
            List<Post> fks = postRepository.findByParentId(id);
            fks.forEach(x -> x.setParent(null));
            postRepository.saveAll(fks);

            //salva fk como null, dps deleta
            postRepository.deleteById(id);
        return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            throw new ResourceNotFoundException("Resource not found");
        }

    }

    @Transactional
    public Page<PostDTO> findReplies(Pageable pageable, Long id) {
        if(!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }

        Page<Post> message = postRepository.findReplies(pageable, id);
        return message.map(x -> new PostDTO(x));
    }

    @Transactional
    public PostDTO updateLikeCount(Long id) {
        if(!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }

        postRepository.updateLikeCount(id);

        Post updatedPost = postRepository.getReferenceById(id);
        return new PostDTO(updatedPost);
    }

    @Transactional
    public PostDTO removeLike(Long id) {
        if(!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id message not found");
        }

        postRepository.removeLike(id);

        Post updatedPost = postRepository.getReferenceById(id);
        return new PostDTO(updatedPost);
    }

    private void copyDtoToEntity(PostDTO postDTO, Post post) {
        post.setMessage(postDTO.getMessage());
        post.setPostedAt(postDTO.getPostedAt());
        post.setImage(postDTO.getImage());
        post.setLikeCount(postDTO.getLikeCount());
        post.setReply(postDTO.getReply());      
    }
}
