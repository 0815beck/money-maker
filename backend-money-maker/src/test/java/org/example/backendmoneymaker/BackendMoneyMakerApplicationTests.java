package org.example.backendmoneymaker;

import org.example.backendmoneymaker.entities.Account;
import org.example.backendmoneymaker.entities.Category;
import org.example.backendmoneymaker.entities.FixedCost;
import org.example.backendmoneymaker.repositories.AccountRepository;
import org.example.backendmoneymaker.repositories.CategoryRepository;
import org.example.backendmoneymaker.repositories.FixedCostRepository;
import org.example.backendmoneymaker.repositories.TransactionRepository;
import org.example.backendmoneymaker.services.FixedCostService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest(webEnvironment= SpringBootTest.WebEnvironment.RANDOM_PORT)
class BackendMoneyMakerApplicationTests {

    @LocalServerPort
    private int port;

    @Autowired
    private TestRestTemplate http;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private FixedCostService fixedCostService;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private FixedCostRepository fixedCostRepository;

    @Test
    void contextLoads() {
        assertThat(transactionRepository).isNotNull();
        assertThat(http).isNotNull();
    }

    @Test
    void initDataIsTestData() {
        List<Account> accounts = accountRepository.findAll();
        Optional<Account> testAccount = accounts.stream()
                .filter(account -> "__TEST ACCOUNT__".equals(account.getName()))
                .findFirst();
        assertThat(testAccount).isNotEmpty();
    }

    @Test
    void accountEndPointWorksCorrectly() {
        String url = "http://localhost:" + port + "/accounts";

//GET accounts returns the test account
        ResponseEntity<Account[]> response = http.getForEntity(url, Account[].class);
        Account[] accounts = response.getBody();
        if (accounts == null) {
            fail(); return;
        }
        assertThat(accounts.length).isEqualTo(1);
        assertThat(accounts[0].getName()).isEqualTo("__TEST ACCOUNT__");

//GET .../accounts/id with a non existing id returns an error code
        ResponseEntity<Account> response2 =
                http.getForEntity(url + "/100", Account.class);
        assertThat(response2.getStatusCode().isError()).isTrue();
        assertThat(response2.getBody()).isNull();

//Posting a new account without setting a name gets responded to with an error
        Account newAccount = new Account();
        ResponseEntity<Account> response3 =
                http.postForEntity(url, newAccount, Account.class);
        assertThat(response3.getStatusCode().isError()).isTrue();
//The new account is not saved to the database
        assertThat(accountRepository.findAll().size()).isEqualTo(1);
    }

//TESTS FÜR DIE HAUPTLOGIK (TRANSAKTIONEN VON FIX-KOSTEN GENERIEREN)
//KOMMEN HIER DRUNTER
    @Test
    void generatingTransactionsMethodActuallyGeneratesTransactions() {
        Account testAccount = accountRepository.findAll().getFirst();
        Category category = categoryRepository.findAll().getFirst();
        LocalDate today = LocalDate.now();
        FixedCost fixedCost = new FixedCost();
        fixedCost.setAmount(new BigDecimal("100.00"));
        fixedCost.setAccount(testAccount);
        fixedCost.setStart(today);
        fixedCost.setDescription("__TEST FIXED COST STARTING RIGHT NOW__");
        fixedCost.setCategory(category);

        fixedCostRepository.save(fixedCost);

        fixedCost = fixedCostRepository.findById(fixedCost.getId()).orElseThrow();
        assertThat(fixedCost.getGeneratedTransactions().size()).isEqualTo(0);

        fixedCostService.generateTransactionsForAllAccounts();

        fixedCost = fixedCostRepository.findById(fixedCost.getId()).orElseThrow();
        assertThat(fixedCost.getGeneratedTransactions().size()).isEqualTo(1);
    }

    @Test
    void andItDoesNotGenerateWhenTheTransactionIsAlreadyPresent() {
        FixedCost fixedCost = fixedCostRepository.findAll()
                .stream().filter(fC -> fC.getDescription()
                .equals("__TEST FIXED COST STARTING RIGHT NOW__"))
                .findFirst().orElseThrow();
        assertThat(fixedCost.getGeneratedTransactions().size()).isEqualTo(1);
        fixedCostService.generateTransactionsForAllAccounts();
        fixedCost = fixedCostRepository.findById(fixedCost.getId()).orElseThrow();
        assertThat(fixedCost.getGeneratedTransactions().size()).isEqualTo(1);
    }

    @Test
    void andItGeneratesOnlyWhenTheDayIsRight() {
        Account testAccount = accountRepository.findAll().getFirst();
        Category category = categoryRepository.findAll().getFirst();
        LocalDate yesterday = LocalDate.now().minusDays(1);
        FixedCost fixedCost = new FixedCost();
        fixedCost.setAmount(new BigDecimal("100.00"));
        fixedCost.setAccount(testAccount);
        fixedCost.setStart(yesterday);
        fixedCost.setDescription("__TEST FIXED COST STARTING YESTERDAY__");
        fixedCost.setCategory(category);

        fixedCostRepository.save(fixedCost);
        fixedCost = fixedCostRepository.findById(fixedCost.getId()).orElseThrow();
        assertThat(fixedCost.getGeneratedTransactions().size()).isEqualTo(0);

        fixedCostService.generateTransactionsForAllAccounts();
        fixedCost = fixedCostRepository.findById(fixedCost.getId()).orElseThrow();
        assertThat(fixedCost.getGeneratedTransactions().size()).isEqualTo(0);
    }

    @Test
    void whichIsOnceAMonth() {
        Account testAccount = accountRepository.findAll().getFirst();
        Category category = categoryRepository.findAll().getFirst();
        LocalDate yesterday = LocalDate.now().minusMonths(1);
        FixedCost fixedCost = new FixedCost();
        fixedCost.setAmount(new BigDecimal("100.00"));
        fixedCost.setAccount(testAccount);
        fixedCost.setStart(yesterday);
        fixedCost.setDescription("__TEST FIXED COST STARTING EXACTLY A MONTH AGO__");
        fixedCost.setCategory(category);

        fixedCostRepository.save(fixedCost);
        fixedCost = fixedCostRepository.findById(fixedCost.getId()).orElseThrow();
        assertThat(fixedCost.getGeneratedTransactions().size()).isEqualTo(0);

        fixedCostService.generateTransactionsForAllAccounts();
        fixedCost = fixedCostRepository.findById(fixedCost.getId()).orElseThrow();
        assertThat(fixedCost.getGeneratedTransactions().size()).isEqualTo(1);
    }


}
