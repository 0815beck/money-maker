package org.example.backendmoneymaker.services;

import org.example.backendmoneymaker.entities.Transaction;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface TransactionService {

    ResponseEntity<Transaction> addTransaction(Transaction transaction);
    ResponseEntity<Void> deleteTransaction(Long id);
    ResponseEntity<Optional<Transaction>> updateTransaction(Transaction transaction);

    ResponseEntity<List<Transaction>> getAllTransactions();
    ResponseEntity<Optional<Transaction>> findTransaction(Long id);
}
