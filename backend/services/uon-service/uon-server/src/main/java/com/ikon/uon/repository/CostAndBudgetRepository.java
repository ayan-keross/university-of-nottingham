package com.ikon.uon.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uon.model.CostAndBudget;

public interface CostAndBudgetRepository extends MongoRepository<CostAndBudget, String> {
    CostAndBudget findByProjectIdentifier(String projectIdentifier);
}
