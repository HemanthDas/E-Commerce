package com.example.backend.dto;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.UUID;

@Getter
@Setter
public class ProductGetAllDTO {
    private UUID product_id;
    private String product_name;
    private BigDecimal product_price;
    private UUID product_category_id;
    private String product_imageUrl;
}
