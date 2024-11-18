package org.example.backendmoneymaker.services;

import org.example.backendmoneymaker.entities.FixedCost;
import org.example.backendmoneymaker.repositories.FixedCostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FixedCostServiceImpl implements FixedCostService {

    private final FixedCostRepository fixedCostRepository;

    public FixedCostServiceImpl(FixedCostRepository fixedCostRepository) {
        this.fixedCostRepository = fixedCostRepository;
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
    public void delteById(Long id) {
        fixedCostRepository.deleteById(id);
    }
}
