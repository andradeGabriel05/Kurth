package com.kurth.kurth.services;

import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public UserDTO insert(UserDTO userDTO) {
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
}
