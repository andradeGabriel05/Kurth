package com.kurth.kurth.dto.feed;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record FeedReplyDTO(
        Long id,
        String message,
        String image,
        Instant postedAt,
        FeedUserDTO user
) {}
