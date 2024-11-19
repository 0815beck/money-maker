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
public class TransactionController {

    private final TransactionService service;

    public TransactionController(TransactionService service){
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<Transaction> addTransaction(@RequestBody Transaction transaction){
        return service.addTransaction(transaction);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable Long id){
        return service.deleteTransaction(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Optional<Transaction>> updateTransaction(@PathVariable Long id, @RequestBody Transaction transaction){
        return service.updateTransaction(id, transaction);
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
