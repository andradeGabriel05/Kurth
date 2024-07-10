package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
