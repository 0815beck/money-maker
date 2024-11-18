package org.example.backendmoneymaker.controllers;

import org.example.backendmoneymaker.entities.FixedCost;
import org.example.backendmoneymaker.repositories.FixedCostRepository;
import org.example.backendmoneymaker.services.FixedCostService;
import org.example.backendmoneymaker.services.FixedCostServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class FixedCostController {

    private final FixedCostService fixedCostService;
    private final FixedCostRepository fixedCostRepository;

    public FixedCostController(FixedCostServiceImpl fixedCostService, FixedCostRepository fixedCostRepository) {
        this.fixedCostService = fixedCostService;
        this.fixedCostRepository = fixedCostRepository;
    }

    @GetMapping("/fixedCost")
    public List<FixedCost> getAll() {
        return fixedCostService.getAll();
    }

    @GetMapping("/fixedCost/{id}")
    public ResponseEntity<FixedCost> getById(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        Optional<FixedCost> fixedCostOptional = fixedCostService.findById(id);

        if (fixedCostOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(fixedCostOptional.orElseThrow());
    }

    @PostMapping("/fixedCost")
    public ResponseEntity<FixedCost> create(@RequestBody @Validated FixedCost fixedCost) {
        if (fixedCost.getId() != null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(fixedCostService.create(fixedCost));
    }

    @PutMapping("/fixedCost")
    public ResponseEntity<FixedCost> modify(@RequestBody @Validated FixedCost fixedCost) {
        if (fixedCost.getId() == null) {
            return ResponseEntity.badRequest().build();
        }

        if (fixedCostRepository.findById(fixedCost.getId()).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(fixedCostService.modify(fixedCost));
    }

    @DeleteMapping("/fixedCost/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (id == null) {
            return ResponseEntity.badRequest().build();
        }

        if (fixedCostRepository.findById(id).isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        fixedCostRepository.deleteById(id);

        return ResponseEntity.noContent().build();
    }
}
