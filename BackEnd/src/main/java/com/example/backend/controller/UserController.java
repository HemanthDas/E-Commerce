package com.example.backend.controller;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin()
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/email")
    public User getUserEmail(@RequestParam String email, HttpServletRequest request) {
        return userService.getUserDetails(email);
    }
}
