package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.Follow;
import com.kurth.kurth.entities.LikeCount;
import com.kurth.kurth.entities.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface FollowRepository extends JpaRepository<Follow, Long> {
    Optional<Follow> findByUserFollowerIdAndUserFollowingId(UUID userFollowerId, UUID userFollowingId);

    @Query("SELECT obj FROM Follow obj WHERE obj.userFollowerId = :userFollowerId AND obj.userFollowingId = :userFollowingId")
    Optional<Follow> userAlreadyFollowing(UUID userFollowerId, UUID userFollowingId);

    @Query("SELECT obj FROM Follow obj WHERE obj.userFollowingId = :id")
    Page<Follow> followers(Pageable pageable, UUID id);


}

