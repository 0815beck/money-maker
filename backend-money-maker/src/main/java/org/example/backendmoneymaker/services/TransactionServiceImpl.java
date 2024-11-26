package org.example.backendmoneymaker.services;

import lombok.AllArgsConstructor;
import org.example.backendmoneymaker.entities.Transaction;
import org.example.backendmoneymaker.repositories.TransactionRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@AllArgsConstructor
@Service
public class TransactionServiceImpl implements TransactionService {

    private final TransactionRepository repository;

    @Override
    public ResponseEntity<Transaction> addTransaction(Transaction transaction) {
        if(transaction != null){
            repository.save(transaction);
            return new ResponseEntity<>(transaction, HttpStatus.CREATED);
        } else {
            System.out.println("Fehler beim erstellen der Transaction");
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<Void> deleteTransaction(Long id) {
        Optional <Transaction> transaction = repository.findById(id);
        if(transaction.isPresent()){
            repository.deleteById(id);
            return new ResponseEntity<>( HttpStatus.ACCEPTED);
        } else {
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<Optional<Transaction>> updateTransaction(Transaction transaction) {
        Optional <Transaction> oldTransaction = repository.findById(transaction.getId());
        if(oldTransaction.isPresent()){
            oldTransaction.get().setAmount(transaction.getAmount());
            oldTransaction.get().setDescription(transaction.getDescription());
            if(transaction.getCategory() != null){
                oldTransaction.get().setCategory(transaction.getCategory());
            }
            if(transaction.getTimestamp() != null){
                oldTransaction.get().setTimestamp(transaction.getTimestamp());
            }
            repository.save(oldTransaction.get());
            return new ResponseEntity<>(oldTransaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @Override
    public ResponseEntity<List<Transaction>> getAllTransactions() {
        List<Transaction> transactions = repository.findAll();
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<Transaction>> findTransaction(Long id) {
        Optional <Transaction> transaction = repository.findById(id);
        if(transaction.isPresent()){
            return new ResponseEntity<>(transaction, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
