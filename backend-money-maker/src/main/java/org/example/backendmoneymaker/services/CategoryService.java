package org.example.backendmoneymaker.services;

import org.example.backendmoneymaker.entities.Category;
import java.util.List;
import java.util.Optional;


public interface CategoryService {

    List<Category> getAllCategories();

    void deleteCategory(Long id);

    Optional<Category> getCategoryByID(Long id);

    Category saveCategory(Category category);
}
