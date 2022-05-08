package com.javatechie.spring.mongo.api.repository;

import com.javatechie.spring.mongo.api.model.Compar;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ComparRepository extends MongoRepository<Compar, Integer> {

}