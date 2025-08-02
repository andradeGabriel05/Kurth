package com.kurth.kurth.dto.login;

public record LoginResponse(String accessToken, Long expiresIn) {
}
