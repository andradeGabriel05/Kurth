package com.kurth.kurth.services;

import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserDTO newUser(UserDTO userDTO) {
        User user = new User();

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

        user = userRepository.save(user);
        return new UserDTO(user);

    }

    @Transactional(readOnly = true)
    public UserDTO findById(Long id) {
        User user = userRepository.findById(id).get();
        return new UserDTO(user);
    }

//    @Transactional(readOnly = true)
//    public UserDTO findByUsername(String username) {
//        User user = userRepository.findByUsername(username).get();
//
//        return new UserDTO(user);
//    }

    public Page<UserDTO> findAll(Pageable pageable) {
        Page<User> user = userRepository.findAll(pageable);
        return user.map(x -> new UserDTO(x));
    }

}
