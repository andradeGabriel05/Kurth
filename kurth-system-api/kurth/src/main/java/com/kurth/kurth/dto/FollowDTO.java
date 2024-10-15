package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Follow;

import java.util.Optional;

public class FollowDTO {

    private Long id;

    //  quem será seguido
    private Long userFollowingId;

    //quem irá seguir
    private Long userFollowerId;

    public FollowDTO() {
    }

    public FollowDTO(Long id, Long userFollowingId, Long userFollowerId) {
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

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserFollowingId() {
        return userFollowingId;
    }

    public void setUserFollowingId(Long userFollowingId) {
        this.userFollowingId = userFollowingId;
    }

    public Long getUserFollowerId() {
        return userFollowerId;
    }

    public void setUserFollowerId(Long userFollowerId) {
        this.userFollowerId = userFollowerId;
    }
}
