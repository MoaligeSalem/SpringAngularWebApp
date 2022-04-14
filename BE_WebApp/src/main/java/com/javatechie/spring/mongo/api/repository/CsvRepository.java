package com.javatechie.spring.mongo.api.repository;

import com.javatechie.spring.mongo.api.model.Book;
import com.javatechie.spring.mongo.api.model.Csv;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CsvRepository extends MongoRepository<Csv, Integer> {
}
