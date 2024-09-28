package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistrationResponseDTO {
    public boolean success;
    private String Message;
    public RegistrationResponseDTO() {
        this.success = false;
        this.Message = "User already exists with the Email";
    }
    public RegistrationResponseDTO(boolean success) {
        this.success = success;
        this.Message = "Welcome to our website";
    }
}
