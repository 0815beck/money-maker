package org.example.backendmoneymaker.services;

import org.example.backendmoneymaker.entities.Category;
import java.util.List;


public interface CategoryService {

    List<Category> getAllCategories();

    void deleteCategory(Long id);

    Category updateCategory(Category category);
}
