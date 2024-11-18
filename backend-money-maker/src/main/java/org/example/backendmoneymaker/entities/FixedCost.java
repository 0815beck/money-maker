package org.example.backendmoneymaker.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
public class FixedCost {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @DecimalMin("0.0")
    private BigDecimal amount;

    @NotNull
    private LocalDate start;

    @NotNull
    @Min(0)
    private Integer intervalInDays;

    @ManyToOne
    private Category category;

    @ManyToOne
    private Account account;

    @OneToMany
    @JoinTable(
            name = "fixed_cost_transactions",
            joinColumns = @JoinColumn(name = "fixed_cost_id"),
            inverseJoinColumns = @JoinColumn(name = "transaction_id")
    )
    private List<Transaction> generatedTransactions;
}
