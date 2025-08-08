package com.kurth.kurth.dto;

import com.kurth.kurth.entities.Follow;
import com.kurth.kurth.entities.User;

import java.util.Optional;
import java.util.UUID;

public class FollowDTO {

    private Long id;

    //  quem será seguido
    private UserDTO userFollowing;

    //quem irá seguir
    private UserDTO userFollower;

    public FollowDTO() {
    }

    public FollowDTO(Long id, UserDTO userFollowing, UserDTO userFollower) {
        this.id = id;
        this.userFollowing = userFollowing;
        this.userFollower = userFollower;
    }

    public FollowDTO(Follow follow) {
        this.id = follow.getId();
        this.userFollowing = new UserDTO(follow.getUserFollowing());
        this.userFollower = new UserDTO(follow.getUserFollower());
    }

    public Long getId() {
        return id;
    }

    public UserDTO getUserFollowing() {
        return userFollowing;
    }

    public void setUserFollowing(UserDTO userFollowing) {
        this.userFollowing = userFollowing;
    }

    public UserDTO getUserFollower() {
        return userFollower;
    }

    public void setUserFollower(UserDTO userFollower) {
        this.userFollower = userFollower;
    }
}
