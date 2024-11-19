package org.example.backendmoneymaker.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Entity
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private BigDecimal balance;

    @OneToMany(mappedBy = "account")
    @JsonIgnoreProperties("account")
    private List<FixedCost> fixedCosts;


    @OneToMany(mappedBy = "account")
    @JsonIgnoreProperties("account")
    private List<Transaction> transactions;
}
