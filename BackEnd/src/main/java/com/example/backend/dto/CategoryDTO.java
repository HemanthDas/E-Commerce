package com.example.backend.dto;

import lombok.Getter;

import java.util.UUID;

@Getter
public class CategoryDTO {
    private final UUID id;
    private final String name;
    private final String description;

    public CategoryDTO(UUID id, String name, String description) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

}
