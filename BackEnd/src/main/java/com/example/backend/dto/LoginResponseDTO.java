package com.example.backend.dto;

public class LoginResponseDTO {
    private String token;
    private String username;
    private long expiresIn;
    private String tokenType;
    private UserInfoDTO userInfo;
}
