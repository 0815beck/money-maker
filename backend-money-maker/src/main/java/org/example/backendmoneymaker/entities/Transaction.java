package org.example.backendmoneymaker.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name="transaction")
@Data
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private BigDecimal amount;
    @NotNull
    private LocalDate timestamp;
    private String description;
    @NotNull
    @JsonProperty("isFixedCost")
    private boolean isFixedCost;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "category_id")
    private Category category;

    @NotNull
    @ManyToOne(fetch = FetchType.EAGER)
    @JsonIgnoreProperties({"transactions", "fixedCosts"})
    private Account account;

    @Override
    public String toString() {
        return "{id: " + id + ", description: " + description
                + ", amount: " + amount + ", timestamp: " + timestamp + "}";
    }

}
