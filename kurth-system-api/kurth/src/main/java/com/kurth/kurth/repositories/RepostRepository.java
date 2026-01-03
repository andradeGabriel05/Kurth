package com.kurth.kurth.repositories;

import com.kurth.kurth.dto.feed.FeedPostDTO;
import com.kurth.kurth.entities.LikeCount;
import com.kurth.kurth.entities.Post;
import com.kurth.kurth.entities.Repost;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RepostRepository extends JpaRepository<Repost, Long> {

}
