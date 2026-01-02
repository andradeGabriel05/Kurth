package com.kurth.kurth.dto.feed;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.kurth.kurth.entities.User;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record FeedUserDTO(
        String name,
        String username,
        String avatar
) {
    public FeedUserDTO(User user) {
        this(user.getName(), user.getUsername(), user.getAvatar());
    }
}