package com.javatechie.spring.mongo.api.model;



import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;



@Document(collection="Book")
@Component
public class DatabaseSequence {
    @Id
    private String id;



    private int seq;



    public DatabaseSequence() {}



    public String getId() {
        return id;
    }



    public void setId(String id) {
        this.id = id;
    }



    public long getSeq() {
        return seq;
    }



    public void setSeq(int seq) {
        this.seq = seq;
    }
}
