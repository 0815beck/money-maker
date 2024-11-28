package org.example.backendmoneymaker.repositories;

import jakarta.transaction.Transactional;
import org.example.backendmoneymaker.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Modifying
    @Transactional
    @Query(value =
            "INSERT INTO FIXED_COST_TRANSACTIONS (FIXED_COST_ID, TRANSACTION_ID) VALUES (?1, ?2)",
    nativeQuery = true)
    void markTransactionAsGeneratedByFixCost(Long fixCostId, Long transactionId);
}
