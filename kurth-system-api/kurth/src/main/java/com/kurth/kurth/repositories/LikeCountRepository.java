package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.LikeCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LikeCountRepository extends JpaRepository<LikeCount, Long> {
    Optional<LikeCount> findByUserIdAndMessageId(Long userId, Long messageId);


}
