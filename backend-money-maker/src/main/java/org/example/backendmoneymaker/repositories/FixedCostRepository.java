package org.example.backendmoneymaker.repositories;

import org.example.backendmoneymaker.entities.FixedCost;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FixedCostRepository extends JpaRepository<FixedCost, Long> { }
