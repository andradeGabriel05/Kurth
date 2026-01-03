package com.kurth.kurth.dto.feed;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record FeedRepostDTO(
        Long id,
        FeedUserDTO user
) {}
