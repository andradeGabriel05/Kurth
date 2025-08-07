package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Follow;
import com.kurth.kurth.entities.User;

import java.util.Optional;
import java.util.UUID;

public class FollowDTO {

    private Long id;

    //  quem será seguido
    private User userFollowing;

    //quem irá seguir
    private User userFollower;

    public FollowDTO() {
    }

    public FollowDTO(Long id, User userFollowing, User userFollower) {
        this.id = id;
        this.userFollowing = userFollowing;
        this.userFollower = userFollower;
    }

    public FollowDTO(Follow follow) {
        this.id = follow.getId();
        this.userFollowing = follow.getUserFollowing();
        this.userFollower = follow.getUserFollower();
    }

    public Long getId() {
        return id;
    }

    public User getUserFollowing() {
        return userFollowing;
    }

    public void setUserFollowing(User userFollowing) {
        this.userFollowing = userFollowing;
    }

    public User getUserFollower() {
        return userFollower;
    }

    public void setUserFollower(User userFollower) {
        this.userFollower = userFollower;
    }
}
