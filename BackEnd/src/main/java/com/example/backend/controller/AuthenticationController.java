package com.example.backend.controller;

import com.example.backend.dto.LoginResponseDTO;
import com.example.backend.dto.RegistrationResponseDTO;
import com.example.backend.model.User;
import com.example.backend.service.AuthService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/auth")
public class AuthenticationController {
    private final AuthService authService;

    public AuthenticationController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping(path = "/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        RegistrationResponseDTO responseDTO = authService.RegisterUser(user);
        if(responseDTO.success) {
            return new ResponseEntity<>(responseDTO, HttpStatus.CREATED);
        }
        System.out.println(new RegistrationResponseDTO());
        return new ResponseEntity<>( new RegistrationResponseDTO(), HttpStatus.CONFLICT);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletResponse response) {
        LoginResponseDTO userToken = authService.LoginUser(user);
        if (userToken.getToken() != null) {
            Cookie cookie = new Cookie("token", userToken.getToken());
            response.addCookie(cookie);
            return new ResponseEntity<>(userToken, HttpStatus.OK);
        }
        return new ResponseEntity<>("Invalid email or password", HttpStatus.UNAUTHORIZED);
    }
    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken() {
            return new ResponseEntity<>("Token is Validated ", HttpStatus.OK);
    }
}
