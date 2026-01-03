package com.kurth.kurth.repositories;

import com.kurth.kurth.dto.feed.FeedPostDTO;
import com.kurth.kurth.entities.LikeCount;
import com.kurth.kurth.entities.Post;
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
public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("""
    SELECT obj
    FROM Post obj
    WHERE obj.user.username = :username
""")
    Page<Post> findAllUserMessages(String username, Pageable pageable);

    @Query("""
SELECT new com.kurth.kurth.dto.feed.FeedPostDTO(
    p.id,
    p.message,
    p.image,
    p.postedAt,
    p.likeCount,

    new com.kurth.kurth.dto.feed.FeedUserDTO(u.name, u.username, u.avatar),
    
    new com.kurth.kurth.dto.feed.FeedReplyDTO(
        reply.id,
        reply.message,
        reply.image,
        reply.postedAt,
        new com.kurth.kurth.dto.feed.FeedUserDTO(replyUser.name, replyUser.username, replyUser.avatar)
    )
)
FROM Post p
JOIN p.user u

LEFT JOIN Post reply ON reply.id = p.replyOfId
LEFT JOIN reply.user replyUser
""")
    Page<FeedPostDTO> getFeed(Pageable pageable);

    List<Post> findAllByUserId(UUID id);

    @Query("SELECT obj FROM Post obj WHERE obj.image IS NOT NULL")
    List<Post> findAllMessagesWithImage();

    @Query("SELECT m FROM Post m JOIN Follow f ON m.user.id = f.userFollowing.id WHERE f.userFollower.id = :followerId")
    Page<Post> findAllUserFollowingMessages(Pageable pageable, UUID followerId);

    //atenção!!! todo -> remove REPLY
    @Query("SELECT COUNT(obj) FROM Post obj " +
            "WHERE obj.replyOfId = :id GROUP BY obj.replyOfId")
    Integer countReplyMessages(@Param("id") Long id);

    @Query("SELECT obj FROM Post obj WHERE obj.replyOfId = :id")
    Page<Post> findReplies(Pageable pageable, @Param("id") Long id);

    // esse é lista
    @Query("SELECT obj FROM Post obj WHERE obj.replyOfId = :id")
    List<Post> findByParentId(@Param("id")Long id);

    @Modifying
    @Query("UPDATE Post obj SET obj.likeCount = obj.likeCount + 1 WHERE obj.id = :id")
    Integer updateLikeCount(@Param("id") Long id);

    @Modifying
    @Query("UPDATE Post obj SET obj.likeCount = obj.likeCount - 1 WHERE obj.id = :id")
    Integer removeLike(@Param("id") Long id);

    @Query("SELECT obj FROM LikeCount obj WHERE obj.post = :id")
    List<LikeCount> likes(@Param("id") Long id);


}
