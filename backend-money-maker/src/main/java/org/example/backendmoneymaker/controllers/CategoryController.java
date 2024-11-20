package org.example.backendmoneymaker.controllers;


import jakarta.validation.Valid;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.backendmoneymaker.entities.Category;
import org.example.backendmoneymaker.services.CategoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/categories")
@CrossOrigin({"http://localhost:4200"})
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }

    @PostMapping
    ResponseEntity<Category> createCategory(@RequestBody @Valid Category category) {
        if (category.getId() != null) {
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.saveCategory(category));
    }

    @PutMapping
    ResponseEntity<Category> modifyCategory(@RequestBody @Valid Category category) {
        if (category.getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        if (categoryService.getCategoryByID(category.getId()).isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(categoryService.saveCategory(category));
    }


    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        categoryService.deleteCategory(id);
        return ResponseEntity.ok().build();
    }
}
