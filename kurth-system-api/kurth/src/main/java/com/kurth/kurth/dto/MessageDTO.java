package com.kurth.kurth.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.kurth.kurth.entities.Message;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.time.Instant;
import java.time.LocalDate;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageDTO {

    private Long id;

    @Size(max = 280, message = "The message must have a maximum of 280 characters.")
    @NotBlank(message = "Message cannot be null.")
    private String message;

    private Instant postedAt;

    private String image;

    private Integer likeCount;

    private UserDTO user;

    public MessageDTO(Long id, String message, Instant postedAt, String image, Integer likeCount, UserDTO user) {
        this.id = id;
        this.message = message;
        this.postedAt = postedAt;
        this.image = image;
        this.likeCount = likeCount;
        this.user = user;
    }

    public MessageDTO(Message message) {
        this.id = message.getId();
        this.message = message.getMessage();
        this.postedAt = message.getPostedAt();
        this.image = message.getImage();
        this.likeCount = message.getLikeCount();
        this.user = new UserDTO(message.getUser());
    }

    public Long getId() {
        return id;
    }

    public String getMessage() {
        return message;
    }

    public Instant getPostedAt() {
        return postedAt;
    }

    public String getImage() {
        return image;
    }

    public UserDTO getUser() {
        return user;
    }

    public Integer getLikeCount() {
        return likeCount;
    }

}
