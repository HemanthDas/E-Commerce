package com.example.backend.service;

import com.example.backend.dto.CategoryDTO;
import com.example.backend.dto.ResponseDTO;
import com.example.backend.model.Categories;
import com.example.backend.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    public ResponseDTO addCategory(String name,String description) {
        if(categoryRepository.existsByName(name)){
            return new ResponseDTO(false, "Category already exists");
        }
        Categories newCategory = new Categories();
        newCategory.setName(name);
        newCategory.setDescription(description);
        try{
            categoryRepository.save(newCategory);
            return new ResponseDTO(true, "Category added");
        }catch (Exception e){
            return new ResponseDTO(false, e.getMessage());
        }
    }
    public List<CategoryDTO> getAllCategories() {
        List<Categories> categories = categoryRepository.findAll();

        return categories.stream().map(category ->
                new CategoryDTO(
                        category.getId(),
                        category.getName(),
                        category.getDescription()))
                .collect(Collectors.toList());
    }
}
