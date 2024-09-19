package com.example.backend.service;

import com.example.backend.repository.UsersRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private UsersRepository usersRepository;
    public AuthService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }
    public
}
