package org.example.backendmoneymaker.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Account {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @OneToMany(mappedBy = "account", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("account")
    private List<FixedCost> fixedCosts;


    @OneToMany(mappedBy = "account", fetch = FetchType.EAGER)
    @JsonIgnoreProperties("account")
    private List<Transaction> transactions;
}
