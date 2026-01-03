package com.kurth.kurth.entities;

import jakarta.persistence.*;

import java.time.Instant;

@Entity(name = "tb_repost")
public class Repost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Instant repostedAt;

    @ManyToOne
    @JoinColumn(name = "repost_of_id")
    private Post repostOf;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    public Repost() {}

    public Repost(Long id, Instant repostedAt, Post repostOf, User user) {
        this.id = id;
        this.repostedAt = repostedAt;
        this.repostOf = repostOf;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getRepostedAt() {
        return repostedAt;
    }

    public void setRepostedAt(Instant repostedAt) {
        this.repostedAt = repostedAt;
    }

    public Post getRepostOf() {
        return repostOf;
    }

    public void setRepostOf(Post repostOf) {
        this.repostOf = repostOf;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
