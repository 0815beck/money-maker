package org.example.backendmoneymaker.controllers;

import org.example.backendmoneymaker.entities.Transaction;
import org.example.backendmoneymaker.services.TransactionService;

import org.example.backendmoneymaker.services.TransactionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/transaction")
@CrossOrigin({"http://localhost:4200"})
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction) {
        if (transaction.getId() != null) {
            return ResponseEntity.badRequest().build();
        }
        return service.addTransaction(transaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id){
        return service.deleteTransaction(id);
    }

    @PutMapping
    public ResponseEntity<Optional<Transaction>> updateTransaction(@RequestBody Transaction transaction) {
        if (transaction.getId() == null) {
            return ResponseEntity.badRequest().build();
        }
        return service.updateTransaction(transaction);
    }

    @GetMapping
    public ResponseEntity<List<Transaction>> getAllTransactions(){
        return service.getAllTransactions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Transaction>> getTransaction(@PathVariable Long id){
        return service.findTransaction(id);
    }

}
