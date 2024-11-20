package org.example.backendmoneymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Data
@Entity
public class FixedCost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private BigDecimal amount;

    @NotNull
    private LocalDate start;

    private String description;


    @ManyToOne
    private Category category;

    @ManyToOne
    @JsonIgnoreProperties({"fixedCosts", "transactions"})
    private Account account;

    @OneToMany
    @JoinTable(
            name = "fixed_cost_transactions",
            joinColumns = @JoinColumn(name = "fixed_cost_id"),
            inverseJoinColumns = @JoinColumn(name = "transaction_id")
    )
    private List<Transaction> generatedTransactions;
}
