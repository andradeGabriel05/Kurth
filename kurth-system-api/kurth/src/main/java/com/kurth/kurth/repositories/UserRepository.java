package com.kurth.kurth.repositories;

import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User, Long> {
//    Optional<User> findByUsername(User username);
}
