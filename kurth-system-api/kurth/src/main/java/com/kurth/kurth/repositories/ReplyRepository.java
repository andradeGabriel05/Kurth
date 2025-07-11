package com.kurth.kurth.repositories;

import com.kurth.kurth.entities.Reply;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepository extends JpaRepository<Reply, Long> {
    @Query("SELECT obj FROM Reply obj " +
            "WHERE obj.postId.id = :id")
    Page<Reply> findAllByMessageId(@Param("id") Long id, Pageable pageable);

    @Query("SELECT COUNT(obj) FROM Reply obj " +
            "WHERE obj.postId.id = :id GROUP BY obj.postId.id")
    Integer countReplyMessages(@Param("id") Long id);


}
