package com.ikon.uonserver.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.ikon.uonserver.model.CostAndBudget;

public interface CostAndBudgetRepository extends MongoRepository<CostAndBudget, String> {
    CostAndBudget findByProjectIdentifier(String projectIdentifier);
}
