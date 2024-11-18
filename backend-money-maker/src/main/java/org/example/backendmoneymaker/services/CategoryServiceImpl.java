package org.example.backendmoneymaker.services;


import lombok.Data;
import org.example.backendmoneymaker.entities.Category;
import org.example.backendmoneymaker.repositories.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Data
public class CategoryServiceImpl implements CategoryService {
    private CategoryRepository categoryRepository;

    @Override
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public Category saveCategory(Category category) {
        return categoryRepository.save(category);
    }

}
