package com.kurth.kurth.dto.feed;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record FeedReplyDTO(
        Long replyId,
        String replyMessage,
        FeedUserDTO replyUser
) {}