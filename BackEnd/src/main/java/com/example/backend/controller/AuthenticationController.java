package com.example.backend.controller;

import com.example.backend.model.User;
import com.example.backend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/auth")
public class AuthenticationController {
    private final AuthService authService;

    public AuthenticationController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping(path = "/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User newUser = authService.RegisterUser(user);
        if(newUser != null) {
            return new ResponseEntity<>(newUser, HttpStatus.CREATED);
        }
        return new ResponseEntity<>("User already Exists with that Email", HttpStatus.CONFLICT);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        String userToken = authService.LoginUser(user);
        if (userToken != null) {
            return new ResponseEntity<>(userToken, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }
}
