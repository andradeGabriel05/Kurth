package com.kurth.kurth.services;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.dto.UserDTO;
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
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PutMapping;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }
        User user = userRepository.findById(id).get();
        return new UserDTO(user);
    }

    @Transactional(readOnly = true)
    public UserDTO findByUsername(String username) {
        User user = userRepository.findByUsername(username).get();

        return new UserDTO(user);
    }

    @Transactional(readOnly = true)
    public Page<UserDTO> findAll(String name, Pageable pageable) {
        Page<User> user = userRepository.searchByName(name, pageable);
        return user.map(x -> new UserDTO(x));
    }


    @Transactional
    public UserDTO newUser(UserDTO userDTO) {
        try {

        User user = new User();

        copyDtoToEntity(userDTO, user);

        user = userRepository.save(user);
        return new UserDTO(user);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("[Service] Integrity violation. Username or email address already exists");
        }

    }


    @Transactional
    public UserDTO update(Long id, UserDTO userDTO) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }
        User user = userRepository.findById(id).get();

        copyDtoToEntity(userDTO, user);

        user = userRepository.save(user);
        return new UserDTO(user);
    }

    @Transactional (propagation = Propagation.SUPPORTS)
    public ResponseEntity<Void> delete(Long id) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }

        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }


    private void copyDtoToEntity(UserDTO userDTO, User user) {
        user.setName(userDTO.getName());
        user.setUsername(userDTO.getUsername());

        user.setEmail(userDTO.getEmail());
        user.setPassword(userDTO.getPassword());

        user.setBio(userDTO.getBio());
        user.setFollowers(userDTO.getFollowers());
        user.setFollowing(userDTO.getFollowing());
        user.setCreatedAt(userDTO.getCreatedAt());
        user.setAvatar(userDTO.getAvatar());
        user.setPosts(userDTO.getPosts());
    }

}
