package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.LikeCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LikeCountRepository extends JpaRepository<LikeCount, Long> {
//    @Query("SELECT obj.id, obj.message.id, obj.user.id FROM LikeCount obj WHERE obj.user.id = :userId and obj.message.id = :messageId")
    Optional<LikeCount> findByUserIdAndMessageId(Long userId, Long messageId);

    @Query("SELECT obj FROM LikeCount obj WHERE obj.user.username = :username")
    Page<LikeCount> findByUserId(String username, Pageable pageable);

}
