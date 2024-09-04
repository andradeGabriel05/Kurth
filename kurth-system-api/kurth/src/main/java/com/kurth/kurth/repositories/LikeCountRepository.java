package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.LikeCount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LikeCountRepository extends JpaRepository<LikeCount, Long> {
}
