package com.mentor.spring.mongo.api.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.mentor.spring.mongo.api.model.PowerProFile;

public interface BookRepository extends MongoRepository<PowerProFile, Integer> {

}
