package org.example.backendmoneymaker.repositories;

import org.example.backendmoneymaker.entities.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
