package com.example.backend.service;

import com.example.backend.dto.LoginResponseDTO;
import com.example.backend.dto.RegistrationResponseDTO;
import com.example.backend.dto.UserInfoDTO;
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
    public RegistrationResponseDTO RegisterUser(User user) {
        if(usersRepository.existsByEmail(user.getEmail())) {
            return new RegistrationResponseDTO();
        }
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
         usersRepository.save(user);
        return new RegistrationResponseDTO(true);
    }
    public LoginResponseDTO LoginUser(User user) {
        try {
            User loggedInUser = usersRepository.findByEmail(user.getEmail());
            if(loggedInUser == null) {return null;}
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));
            if(authentication.isAuthenticated()) {

                String token = jwtService.generateToken(user.getEmail());
                long expiredIn = jwtService.getExpirationTime();
                UserInfoDTO userInfoDTO = new UserInfoDTO(
                        loggedInUser.getId(),
                        loggedInUser.getFullName(),
                        loggedInUser.getEmail());

                return new LoginResponseDTO(
                        token,
                        expiredIn,
                        userInfoDTO
                );
            }
        }catch (AuthenticationException e) {
            e.printStackTrace();
        }
        return null;
    }
}
