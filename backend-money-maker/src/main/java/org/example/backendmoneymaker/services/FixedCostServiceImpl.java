package org.example.backendmoneymaker.services;

import org.example.backendmoneymaker.entities.Account;
import org.example.backendmoneymaker.entities.FixedCost;
import org.example.backendmoneymaker.entities.Transaction;
import org.example.backendmoneymaker.repositories.AccountRepository;
import org.example.backendmoneymaker.repositories.FixedCostRepository;
import org.example.backendmoneymaker.repositories.TransactionRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class FixedCostServiceImpl implements FixedCostService {

    private final FixedCostRepository fixedCostRepository;
    private final TransactionRepository transactionRepository;
    private final AccountRepository accountRepository;

    public FixedCostServiceImpl(
            FixedCostRepository fixedCostRepository,
            TransactionRepository transactionRepository,
            AccountRepository accountRepository) {
        this.fixedCostRepository = fixedCostRepository;
        this.transactionRepository = transactionRepository;
        this.accountRepository = accountRepository;
    }

    @Override
    @Scheduled(cron = "0 0 10 * * *")
    public void generateTransactionsForAllAccounts() {
        List<Account> accounts = accountRepository.findAll();
        for (Account account : accounts) {
            generateTransactions(account);
        }
    }

//    @Scheduled(cron = "* * * * * *")
//    public void test() {
//        System.out.println("Hello, I am scheduled :)");
//    }

    private void generateTransactions(Account account) {

        List<FixedCost> fixedCosts = account.getFixedCosts();

        for (FixedCost fixedCost: fixedCosts) {
            LocalDate today = LocalDate.now();
            LocalDate date = fixedCost.getStart();
            while (true) {
                if (date.equals(today)) {
                    if (transactionAlreadyPresent(fixedCost, date)) {
                        break;
                    }
                    Transaction newTransaction = generateTransactionForSpecificDate(fixedCost, date);
                    newTransaction = transactionRepository.save(newTransaction);
                    transactionRepository.markTransactionAsGeneratedByFixCost(fixedCost.getId(),
                            newTransaction.getId());
//                    fixedCost.getGeneratedTransactions().add(newTransaction);
//                    fixedCostRepository.save(fixedCost);
                    break;
                }

                if (date.isAfter(today)) {
                    break;
                }

                date = date.plusMonths(1);
            }
        }
    }

    private boolean transactionAlreadyPresent(FixedCost fixedCost, LocalDate date) {
        return fixedCost.getGeneratedTransactions()
                .stream()
                .anyMatch(transaction -> transaction.getTimestamp().equals(date));
    }

    private Transaction generateTransactionForSpecificDate(
            FixedCost fixedCost, LocalDate date) {
        Transaction transaction = new Transaction();

        transaction.setAmount(fixedCost.getAmount());
        transaction.setTimestamp(date);
        transaction.setDescription(fixedCost.getDescription());
        transaction.setCategory(fixedCost.getCategory());
        transaction.setAccount(fixedCost.getAccount());
        transaction.setFixedCost(true);

        return transaction;
    }

    @Override
    public List<FixedCost> getAll() {
        return fixedCostRepository.findAll();
    }

    @Override
    public Optional<FixedCost> findById(Long id) {
        return fixedCostRepository.findById(id);
    }

    @Override
    public FixedCost create(FixedCost fixedCost) {
        return fixedCostRepository.save(fixedCost);
    }

    @Override
    public FixedCost modify(FixedCost fixedCost) {
        return fixedCostRepository.save(fixedCost);
    }

    @Override
    public void deleteById(Long id) {
        fixedCostRepository.deleteById(id);
    }
}
