package com.javatechie.spring.mongo.api.repository;

import com.javatechie.spring.mongo.api.model.Csv;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.javatechie.spring.mongo.api.model.Book;

public interface BookRepository extends MongoRepository<Book, Integer> {

}
