package com.example.backend.repository;

import com.example.backend.model.Categories;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface CategoryRepository extends JpaRepository<Categories, UUID> {
    boolean existsByName(String name);
}
