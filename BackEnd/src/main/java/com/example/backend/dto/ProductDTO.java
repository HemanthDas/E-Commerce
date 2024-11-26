package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Setter
@Getter
public class ProductDTO {
    private UUID id;
    private String name;
    private BigDecimal price;
    private int quantity;
    private String description;
    private CategoryDTO category;
    private String image;
}
