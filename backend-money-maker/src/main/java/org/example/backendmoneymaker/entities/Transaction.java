package org.example.backendmoneymaker.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name="transactions")
@Data
public class Transaction {
    @Id
    @GeneratedValue
    private Long id;

    private float amount;
    private Date timestamp;
    private String description;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

    @ManyToOne
    private Account account;









}
