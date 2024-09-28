package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class UserInfoDTO {
    private String id;
    private String fullname;
    private String email;
    public UserInfoDTO(UUID id, String fullName, String email) {
        this.id = id.toString();
        this.fullname = fullName;
        this.email = email;
    }
}
