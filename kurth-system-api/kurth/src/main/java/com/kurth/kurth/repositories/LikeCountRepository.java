package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.LikeCount;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface LikeCountRepository extends JpaRepository<LikeCount, Long> {
//    @Query("SELECT obj.id, obj.message.id, obj.user.id FROM LikeCount obj WHERE obj.user.id = :userId and obj.message.id = :messageId")
    Optional<LikeCount> findByUserIdAndPostId(UUID userId, Long postId);

    @Query("SELECT obj FROM LikeCount obj WHERE obj.user.username = :username")
    Page<LikeCount> findByUserId(String username, Pageable pageable);

    @Query("SELECT obj FROM LikeCount obj WHERE obj.post.id = :id")
    List<LikeCount> findByPostId(Long id);

}
