package org.example.backendmoneymaker.entities;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.util.List;

@Data
@Entity
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    @NotBlank
    private String name;

    @OneToMany(mappedBy = "account")
    @JsonIgnoreProperties("account")
    private List<FixedCost> fixedCosts;


    @OneToMany(mappedBy = "account")
    @JsonIgnoreProperties("account")
    private List<Transaction> transactions;
}
