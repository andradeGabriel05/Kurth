package com.kurth.kurth.repositories;

import com.kurth.kurth.dto.MessageDTO;
import com.kurth.kurth.dto.UserDTO;
import com.kurth.kurth.entities.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT obj FROM Message obj WHERE obj.sentByUser.id = :uuid")
    Page<MessageDTO> findBySentToUser(Pageable pageable, UUID uuid);
}
