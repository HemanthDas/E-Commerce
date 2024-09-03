package com.example.backend.service;

import com.example.backend.model.Product;
import com.example.backend.repository.ProductRepo;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Getter
@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    public Product getProductById(int id) {
        return productRepo.findById(id)
                .orElse(new Product(id, "No Item Found", 0000.0));
    }

    public void addProduct(Product product) {
        productRepo.save(product);
    }

    public void updateProduct(Product product) {
        if (productRepo.existsById(product.getId())) {
            productRepo.save(product);
        }
    }

    public void deleteProduct(int id) {
        if (productRepo.existsById(id)) {
            productRepo.deleteById(id);
        }
    }
}
