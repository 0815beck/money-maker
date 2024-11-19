package org.example.backendmoneymaker.services;

import org.example.backendmoneymaker.entities.FixedCost;

import java.util.List;
import java.util.Optional;

public interface FixedCostService {
    List<FixedCost> getAll();
    Optional<FixedCost> findById(Long id);
    FixedCost create(FixedCost fixedCost);
    FixedCost modify(FixedCost fixedCost);
    void deleteById(Long id);
    void generateTransactionsForAllAccounts();
}
