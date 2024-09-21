package com.example.backend.service;

import com.example.backend.model.User;
import com.example.backend.repository.UsersRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class UserService {
    private final UsersRepository usersRepository;

    public UserService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    public User getUserDetails(String email) {
        return usersRepository.findByEmail(email);
    }
}
