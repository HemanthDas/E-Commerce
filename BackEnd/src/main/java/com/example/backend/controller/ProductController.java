package com.example.backend.controller;

import com.example.backend.model.Product;
import com.example.backend.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ProductController {

    @Autowired
    ProductService productservice;
    @GetMapping(path = "/products")
    public List<Product> getProduct(){
        return productservice.getProductRepo().findAll();
    }
    @GetMapping(path = "/product/{id}")
    public Product getProductById(@PathVariable int id){
        return productservice.getProductById(id);
    }
    @PostMapping(path = "/product/add")
    public void addProduct( @RequestBody Product product){productservice.addProduct(product);}
    @PutMapping(path = "/product")
    public void updateProduct(@RequestBody Product product){
        productservice.updateProduct(product);
    }
    @DeleteMapping(path = "/product/{id}")
    public List<Product> deleteProductById(@PathVariable int id){
        productservice.deleteProduct(id);
        return productservice.getProductRepo().findAll();
    }
}
