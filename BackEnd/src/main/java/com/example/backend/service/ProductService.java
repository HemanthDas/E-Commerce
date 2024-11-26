package com.example.backend.service;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.ProductAddDTO;
import com.example.backend.dto.ProductDTO;
import com.example.backend.dto.ProductGetAllDTO;
import com.example.backend.model.Categories;
import com.example.backend.model.Product;
import com.example.backend.repository.CategoryRepository;
import com.example.backend.repository.ProductRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }
    public ResponseEntity<?> addProduct(ProductAddDTO product) {
        Product newProduct = new Product();
        newProduct.setName(product.getProductName());
        newProduct.setDescription(product.getProductDescription());
        newProduct.setPrice(BigDecimal.valueOf(product.getPrice()));
        newProduct.setCategoryId(product.getCategoryId());
        newProduct.setImageUrl(product.getImage());
        productRepository.save(newProduct);
        return ResponseEntity.ok().build();
    }
    public List<ProductGetAllDTO> getAllProducts() {
        List<Product> products = productRepository.findAll();
        List<ProductGetAllDTO> productGetAllDTOs = new ArrayList<>();
        for (Product product : products) {
            ProductGetAllDTO productGetAllDTO = new ProductGetAllDTO();
            productGetAllDTO.setProduct_id(product.getId());
            productGetAllDTO.setProduct_name(product.getName());
            productGetAllDTO.setProduct_imageUrl(product.getImageUrl());
            productGetAllDTO.setProduct_price(product.getPrice());
            productGetAllDTO.setProduct_category_id(product.getCategoryId());
            productGetAllDTOs.add(productGetAllDTO);
        }
        return productGetAllDTOs;
    }

    public List<Product> getProductsByCategoryId(UUID categoryId) {
        return productRepository.findAllByCategoryId(categoryId);
    }

    public ProductDTO getProductById(UUID id) {
        if(productRepository.existsById(id)) {
            Product product = productRepository.findById(id).orElse(null);
            ProductDTO productDTO = new ProductDTO();
            if(product != null) {
                productDTO.setId(product.getId());
                productDTO.setName(product.getName());
                productDTO.setDescription(product.getDescription());
                productDTO.setPrice(product.getPrice());
                productDTO.setQuantity(product.getStock());
                productDTO.setImage(product.getImageUrl());
                Categories categories = categoryRepository.findById(product.getCategoryId()).orElse(null);
                if(categories != null) {
                    CategoryDTO categoryDTO = new CategoryDTO(categories.getId(), categories.getName(), categories.getDescription());
                    productDTO.setCategory(categoryDTO);
                }
            }
            return productDTO;
        }
        return new ProductDTO();
    }
}
