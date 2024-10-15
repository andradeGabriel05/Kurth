package com.kurth.kurth.entities;

import com.kurth.kurth.dto.FollowDTO;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "tb_follow_user")
public class Follow {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //  quem será seguido
    @NotNull
    private Long userFollowingId;

    //quem irá seguir
    @NotNull
    private Long userFollowerId;

    public Follow() {
    }

    public Follow(Long id, Long userFollowingId, Long userFollowerId) {
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
