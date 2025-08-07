package com.kurth.kurth.entities;

import com.kurth.kurth.dto.FollowDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

@Entity
@Table(name = "tb_follow_user")
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //  quem será seguido
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_following_id")
    private User userFollowing;

    //quem irá seguir
    @NotNull
    @ManyToOne
    @JoinColumn(name = "user_follower_id")
    private User userFollower;

    public Follow() {
    }

    public Follow(Long id, User userFollowing, User userFollower) {
        this.id = id;
        this.userFollowing = userFollowing;
        this.userFollower = userFollower;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
