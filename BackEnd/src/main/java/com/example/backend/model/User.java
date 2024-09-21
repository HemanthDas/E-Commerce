package com.example.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false, unique = true, length = 255)
    private String email;

    @Column(nullable = false, length = 255)
    private String password;

    @Column(name = "full_name", length = 255)
    private String fullName;

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;

    @Column(columnDefinition = "TEXT")
    private String address;

//    @Enumerated(EnumType.STRING)
//    @Column(columnDefinition = "ENUM('customer', 'admin') DEFAULT 'customer'")
//    private Role role = Role.CUSTOMER;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

//    public enum Role {
//        CUSTOMER, ADMIN;
//
//        public static Role fromString(String role) {
//            if (role == null || role.isEmpty()) {
//                return null; // or throw an exception
//            }
//            return Role.valueOf(role.toUpperCase());
//        }
//    }
}
