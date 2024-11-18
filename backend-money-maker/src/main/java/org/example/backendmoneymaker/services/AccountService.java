package org.example.backendmoneymaker.services;

import org.example.backendmoneymaker.entities.Account;

import java.util.List;
import java.util.Optional;

public interface AccountService {

    List<Account> getAllAccounts();

    Optional<Account> getAccountById(Long id);

    void deleteAccount(Long id);

    Account updateAccount(Account account);
}
