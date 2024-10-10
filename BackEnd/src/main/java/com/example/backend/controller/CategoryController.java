package com.example.backend.controller;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.model.Categories;
import com.example.backend.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/category")
public class CategoryController {
    private final CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping(path = "/add")
    public ResponseEntity<?> addCategory(@RequestParam String name,@RequestParam String description) {
        ResponseDTO responseDTO = categoryService.addCategory(name,description);

        if(responseDTO.isSuccess())
            return ResponseEntity.ok(responseDTO);
        else
            return ResponseEntity.badRequest().body(responseDTO);
    }

    @GetMapping(path = "/all")
    public ResponseEntity<List<CategoryDTO>> getAllCategory() {
        List<CategoryDTO> categories = categoryService.getAllCategories();

        return ResponseEntity.ok(categories);
    }
}
