package com.example.backend.repository;

import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;


@Repository
public interface UsersRepository extends JpaRepository<User, UUID> {
    boolean existsByEmail(String email);
    User findByEmail(String email);
}
