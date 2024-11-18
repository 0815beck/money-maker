package org.example.backendmoneymaker.controllers;


import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.example.backendmoneymaker.entities.Account;
import org.example.backendmoneymaker.services.AccountService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/accounts")
public class AccountController {
    private final AccountService accountService;

    @GetMapping
    ResponseEntity<List<Account>> getAllAccounts(){
        return ResponseEntity.ok(accountService.getAllAccounts());
    }

    @GetMapping("/{id}")
    ResponseEntity<Account> getAccount(@PathVariable Long id){
        return accountService.getAccountById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    ResponseEntity<Account> createAccount(@RequestBody Account account){
        if (account.getId() != null){
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(accountService.saveAccount(account));
    }

    @PutMapping
    ResponseEntity<Account> modifyAccount(@RequestBody Account account){
        if (account.getId() == null){
            return ResponseEntity.badRequest().build();
        }
        if (accountService.getAccountById(account.getId()).isEmpty()){
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(accountService.saveAccount(account));
    }

    @DeleteMapping("/{id}")
    ResponseEntity<Void> deleteAccount(@PathVariable Long id){
        accountService.deleteAccount(id);
        return ResponseEntity.ok().build();
    }
}
