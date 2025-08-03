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
    private UUID userFollowingId;

    //quem irá seguir
    @NotNull
    private UUID userFollowerId;

    public Follow() {
    }

    public Follow(Long id, UUID userFollowingId, UUID userFollowerId) {
        this.id = id;
        this.userFollowingId = userFollowingId;
        this.userFollowerId = userFollowerId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
