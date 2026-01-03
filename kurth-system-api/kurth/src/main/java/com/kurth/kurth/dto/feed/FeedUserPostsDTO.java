package com.kurth.kurth.dto.feed;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.Instant;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record FeedUserPostsDTO(
        Long id,
        String type,
        String message,
        Instant createdAt,
        String image,

        String authorUsername,
        String authorDisplayName,
        String authorAvatar,

        String originalAuthorUsername,
        String originalAuthorDisplayName,
        String originalAuthorAvatar
) {
    public FeedUserDTO getAuthor() {
        return new FeedUserDTO(authorDisplayName, authorUsername, authorAvatar);
    }

    public FeedUserDTO getOriginalAuthor() {
        if (originalAuthorUsername == null) return null;
        return new FeedUserDTO(originalAuthorDisplayName, originalAuthorUsername,  originalAuthorAvatar);
    }
}