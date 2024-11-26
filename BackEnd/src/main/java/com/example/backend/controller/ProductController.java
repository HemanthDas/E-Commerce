package com.example.backend.controller;

import com.example.backend.dto.ProductAddDTO;
import com.example.backend.dto.ProductGetAllDTO;
import com.example.backend.model.Product;
import com.example.backend.service.ProductService;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/add")
    public ResponseEntity<?> addProduct(@RequestBody ProductAddDTO product) {
        return productService.addProduct(product);
    }
    @GetMapping("/getAll")
    public List<ProductGetAllDTO> getAllProducts() {
        return productService.getAllProducts();
    }
    @GetMapping("/category")
    public List<Product> getAllProductsByCategory(@RequestParam UUID category) {
        return productService.getProductsByCategoryId(category);
    }
    @GetMapping("/get/{id}")
    public ResponseEntity<?> getProduct(@PathVariable UUID id) {
        return new ResponseEntity<>(productService.getProductById(id), HttpStatus.OK);
    }
}
