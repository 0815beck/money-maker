package org.example.backendmoneymaker.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Category {
    @Id
    private long id;

    private String name;
}
