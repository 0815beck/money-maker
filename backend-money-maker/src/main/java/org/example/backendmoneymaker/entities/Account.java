package org.example.backendmoneymaker.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.math.BigDecimal;
import java.util.List;

@Entity
public class Account {

    @Id
    private long id;

    private String name;

    private BigDecimal balance;

    /*@OneToMany(mappedBy = account)
    @JsonIgnoreProperties("account")
    private List<FixedCost> fixedCosts;

    @OneToMany(mappedBy = account)
    @JsonIgnoreProperties("account")
    private List<Transaction> transactions;*/
}
