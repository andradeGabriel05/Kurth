package com.kurth.kurth.dto.feed;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record FeedPostDTO(
        Long id,
        String message,
        String image,
        Instant postedAt,
        Integer likeCount,

        FeedUserDTO user,

        FeedReplyDTO reply,

        FeedRepostDTO repost
) {}
