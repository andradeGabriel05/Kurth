package com.kurth.kurth.services;

import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.entities.Post;
import com.kurth.kurth.entities.User;
import com.kurth.kurth.repositories.PostRepository;
import com.kurth.kurth.repositories.UserRepository;
import com.kurth.kurth.services.exceptions.DatabaseException;
import com.kurth.kurth.services.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PostRepository postRepository;

    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Transactional(readOnly = true)
    public UserDTO findById(UUID id) {
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
    public Page<UserDTO> findAll(Pageable pageable) {
        Page<User> user = userRepository.findAll(pageable);
        return user.map(x -> new UserDTO(x));
    }


//    @Transactional
//    public UserDTO newUser(UserDTO userDTO) {
//
//        try {
//
//        User user = new User();
//
//        copyDtoToEntity(userDTO, user);
//
//
//        user = userRepository.save(user);
//        return new UserDTO(user);
//        } catch (DataIntegrityViolationException e) {
//            throw new DatabaseException("[Service] Integrity violation. Username or email address already exists");
//        }
//
//    }


    @Transactional
    public UserDTO update(UUID id, UserDTO userDTO) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }
        try {
            User user = userRepository.findById(id).get();

            if(userDTO.getPassword() != null) {
                user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));
            }

            if(userDTO.getName() != null) {
                user.setName(userDTO.getName());
            }
            if(userDTO.getUsername() != null) {
                user.setUsername(userDTO.getUsername());
            }

            if(userDTO.getEmail() != null) {
                user.setEmail(userDTO.getEmail());
            }
            
            if(userDTO.getAvatar() != null) {
                user.setAvatar(userDTO.getAvatar());
            }

            if(userDTO.getBio() != null) {
                user.setBio(userDTO.getBio());
            }

            user = userRepository.save(user);
            return new UserDTO(user);
        } catch (DataIntegrityViolationException e) {
            throw new DatabaseException("[Service] Integrity violation. Username or email address already exists");

        }
    }

    @Transactional (propagation = Propagation.SUPPORTS)
    public ResponseEntity<Void> delete(UUID id) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }

        List<Post> post = postRepository.findAllByUserId(id);

        postRepository.deleteAll(post);

        userRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @Transactional
    public UserDTO login(String username, String password) {
        Optional<User> userOptional = userRepository.login(username, password);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            System.out.println("Usuario existe");
            return new UserDTO(user);
        } else {
            System.out.println("Usuário não existe ou senha inválida");
            return null;
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário ou senha inválidos");
        }
    }

    @Transactional
    public UserDTO updateFollower(UUID id) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }
        User user = userRepository.findById(id).get();
        userRepository.updateFollower(id);
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO updateFollowing(UUID id) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }
        User user = userRepository.findById(id).get();
        userRepository.updateFollowing(id);
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO updateRemoveFollower(UUID id) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }
        User user = userRepository.findById(id).get();
        userRepository.updateRemoveFollower(id);
        return new UserDTO(user);
    }

    @Transactional
    public UserDTO updateRemoveFollowing(UUID id) {
        if(!userRepository.existsById(id)) {
            throw new ResourceNotFoundException("Id user not found");
        }
        User user = userRepository.findById(id).get();
        userRepository.updateRemoveFollowing(id);
        return new UserDTO(user);
    }

    private void copyDtoToEntity(UserDTO userDTO, User user) {
        user.setName(userDTO.getName());
        user.setUsername(userDTO.getUsername());

        user.setEmail(userDTO.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(userDTO.getPassword()));

        user.setCreatedAt(userDTO.getCreatedAt());
        user.setFollowers(userDTO.getFollowers());
        user.setFollowing(userDTO.getFollowing());
        user.setPosts(userDTO.getPosts());
        user.setAvatar(userDTO.getAvatar());
        user.setBio(userDTO.getBio());
    }

}
