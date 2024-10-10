package com.example.backend.controller;

import com.example.backend.service.ProductService;
import org.springframework.web.bind.annotation.RestController;

@RestController("/product")
public class ProductController {

    private final ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

}
