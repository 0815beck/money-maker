package org.example.backendmoneymaker;

import org.example.backendmoneymaker.entities.Transaction;
import org.example.backendmoneymaker.repositories.TransactionRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class BackendMoneyMakerApplicationTests {

    @Autowired
    private TransactionRepository transactionRepository;

    @Test
    void contextLoads() {
        assertThat(transactionRepository).isNotNull();
//loads the list of transactions from the test h2 database (initialized in the test test-data.sql)
        List<Transaction> transactions = transactionRepository.findAll();
        for (Transaction transaction: transactions) {
            System.out.println(transaction);
        }
    }

}
