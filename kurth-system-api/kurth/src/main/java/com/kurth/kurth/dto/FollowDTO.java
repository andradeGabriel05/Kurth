package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Follow;

import java.util.Optional;
import java.util.UUID;

public class FollowDTO {

    private Long id;

    //  quem será seguido
    private UUID userFollowingId;

    //quem irá seguir
    private UUID userFollowerId;

    public FollowDTO() {
    }

    public FollowDTO(Long id, UUID userFollowingId, UUID userFollowerId) {
        this.id = id;
        this.userFollowingId = userFollowingId;
        this.userFollowerId = userFollowerId;
    }

    public FollowDTO(Follow follow) {
        this.id = follow.getId();
        this.userFollowingId = follow.getUserFollowingId();
        this.userFollowerId = follow.getUserFollowerId();
    }

    public Long getId() {
        return id;
    }

    public UUID getUserFollowingId() {
        return userFollowingId;
    }

    public void setUserFollowingId(UUID userFollowingId) {
        this.userFollowingId = userFollowingId;
    }

    public UUID getUserFollowerId() {
        return userFollowerId;
    }

    public void setUserFollowerId(UUID userFollowerId) {
        this.userFollowerId = userFollowerId;
    }
}
