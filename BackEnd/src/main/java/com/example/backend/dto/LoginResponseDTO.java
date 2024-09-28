package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class LoginResponseDTO {
    private String token;
    private long expiresIn;
    private UserInfoDTO userInfo;

    public LoginResponseDTO(String token, long expiresIn, UserInfoDTO userInfo) {
        this.token = token;
        this.expiresIn = expiresIn;
        this.userInfo = userInfo;
    }
}
