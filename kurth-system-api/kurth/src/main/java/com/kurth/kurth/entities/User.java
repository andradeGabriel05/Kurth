package com.kurth.kurth.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kurth.kurth.dto.login.LoginRequest;
import jakarta.persistence.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.Instant;
import java.util.*;

@Entity
@Table(name = "tb_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String name;

    @Column(unique = true)
    private String username;

    @Column(unique = true)
    private String email;

    private Instant createdAt;
    private String password;
    private String bio;
    private String avatar;

    private Integer followers;
    private Integer following;
    private Integer posts;

    @OneToMany(mappedBy = "user")
    private List<Reply> replies = new ArrayList<>();

    @OneToMany(mappedBy = "sentByUser")
    @JsonIgnore
    private List<Message> messagesSent = new ArrayList<>();

    // Mensagens recebidas
    @OneToMany(mappedBy = "sentToUser")
    @JsonIgnore
    private List<Message> messagesReceived = new ArrayList<>();

    public User() {
    }

    public User(UUID id, String name, String username, String email, Instant createdAt, String password, String bio, String avatar, Integer followers, Integer following, Integer posts, List<Reply> replies, List<Message> messagesSent, List<Message> messagesReceived) {
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
        this.replies = replies;
        this.messagesSent = messagesSent;
        this.messagesReceived = messagesReceived;
    }

    public UUID getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Integer getFollowers() {
        return followers;
    }

    public void setFollowers(Integer followers) {
        this.followers = followers;
    }

    public Integer getFollowing() {
        return following;
    }

    public void setFollowing(Integer following) {
        this.following = following;
    }

    public Integer getPosts() {
        return posts;
    }

    public void setPosts(Integer posts) {
        this.posts = posts;
    }

//    public List<Message> getMessage() {
//        return message;
//    }


    public List<Message> getMessagesReceived() {
        return messagesReceived;
    }

    public List<Message> getMessagesSent() {
        return messagesSent;
    }


    public boolean isLoginCorrect(LoginRequest loginRequest, PasswordEncoder passwordEncoder) {
        // compara senha que está vindo com senha do banco que está criptografada
        return passwordEncoder.matches(loginRequest.password(), this.password);
    }
}
