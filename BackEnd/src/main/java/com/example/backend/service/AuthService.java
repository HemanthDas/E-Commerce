package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UsersRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UsersRepository usersRepository;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder(12);
    public AuthService(UsersRepository usersRepository, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.usersRepository = usersRepository;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }
    public User RegisterUser(User user) {
        if(usersRepository.existsByEmail(user.getEmail())) {
            return null;
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return usersRepository.save(user);
    }
    public String LoginUser(User user) {
        try {
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if(authentication.isAuthenticated()) {
                return jwtService.generateToken(user.getEmail());
            }
        }catch (AuthenticationException e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            return null;
        }
        return null;
    }
}
