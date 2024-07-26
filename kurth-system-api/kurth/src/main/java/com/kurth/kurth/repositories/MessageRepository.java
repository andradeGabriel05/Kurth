package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT obj FROM Message obj WHERE obj.user.username = :username")
    List<Message> findAllUserMessages(String username);
}
