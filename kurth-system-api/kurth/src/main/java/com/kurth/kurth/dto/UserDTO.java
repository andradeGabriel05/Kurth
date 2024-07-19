package com.kurth.kurth.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.kurth.kurth.entities.User;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;

public class UserDTO {

    private Long id;

    @NotBlank
    @Size(min = 3, max = 15)
    private String name;

    @NotBlank
    @Size(min = 3, max = 18)
    private String username;

    @NotBlank
    private String email;

    private Instant createdAt;
    private String password;
    private String bio;
    private String avatar;

    private Integer followers;
    private Integer following;
    private Integer posts;

    public UserDTO(Long id, String name, String username, String email, Instant createdAt, String password, String bio, String avatar, Integer followers, Integer following, Integer posts) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.createdAt = createdAt;
        this.password = password;
        this.bio = bio;
        this.avatar = avatar;
        this.followers = followers;
        this.following = following;
        this.posts = posts;
    }

    public UserDTO(User user) {
        this.id = user.getId();
        this.name = user.getName();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.createdAt = user.getCreatedAt();
        this.password = user.getPassword();
        this.bio = user.getBio();
        this.avatar = user.getAvatar();
        this.followers = user.getFollowers();
        this.following = user.getFollowing();
        this.posts = user.getPosts();
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getUsername() {
        return username;
    }

    public String getEmail() {
        return email;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public String getPassword() {
        return password;
    }

    public String getBio() {
        return bio;
    }

    public String getAvatar() {
        return avatar;
    }

    public Integer getFollowers() {
        return followers;
    }

    public Integer getFollowing() {
        return following;
    }

    public Integer getPosts() {
        return posts;
    }
}
