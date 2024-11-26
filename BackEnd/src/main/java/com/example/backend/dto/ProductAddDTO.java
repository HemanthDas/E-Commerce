package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@AllArgsConstructor
public class ProductAddDTO {
    private String productName;
    private String productDescription;
    private UUID categoryId;
    private String image;
    private double price;
}
