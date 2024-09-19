package com.example.backend.controller;

import com.example.backend.model.Users;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class AuthenticationController {
    private final UserService userService;

    public AuthenticationController(UserService userService) {
        this.userService = userService;
    }

    public Users register(Users user) {
        Users newuser = new Users();
        newuser.setUsername(user.getUsername());
        newuser.setPassword(user.getPassword());
        newuser.setEmail(user.getEmail());
        newuser.setRole(user.getRole());
        return newuser;
    }
}
