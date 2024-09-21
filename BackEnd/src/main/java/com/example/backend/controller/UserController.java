package com.example.backend.controller;
import com.example.backend.model.User;
import com.example.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/email")
    public User getUserEmail(@RequestParam String email) {
        System.out.println(email);
        return userService.getUserDetails(email);
    }
}
