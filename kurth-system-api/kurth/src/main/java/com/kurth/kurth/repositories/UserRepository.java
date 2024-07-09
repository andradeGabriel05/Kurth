package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository  extends JpaRepository<User, Long> {
}
