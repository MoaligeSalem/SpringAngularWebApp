package com.mentor.spring.mongo.api.repository;

import com.mentor.spring.mongo.api.model.Csv;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CsvRepository extends MongoRepository<Csv, Integer> {
}
