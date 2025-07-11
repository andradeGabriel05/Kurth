package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.Message;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    @Query("SELECT obj FROM Message obj WHERE obj.user.username = :username")
    Page<Message> findAllUserMessages(String username, Pageable pageable);

    @Query("SELECT obj FROM Message obj WHERE obj.image IS NOT NULL")
    List<Message> findAllMessagesWithImage();

    @Query("SELECT m FROM Message m JOIN Follow f ON m.user.id = f.userFollowingId WHERE f.userFollowerId = :followerId")
    Page<Message> findAllUserFollowingMessages(Pageable pageable, Long followerId);

    @Modifying
    @Query("UPDATE Message obj SET obj.likeCount = obj.likeCount + 1 WHERE obj.id = :id")
    Integer updateLikeCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Message obj SET obj.likeCount = obj.likeCount - 1 WHERE obj.id = :id")
    Integer removeLike(@Param("id") Long id);

}
