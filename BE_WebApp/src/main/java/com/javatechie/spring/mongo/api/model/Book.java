package com.javatechie.spring.mongo.api.model;

import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.List;



@Getter
@Setter
@ToString

@Document(collection="Book")
public class Book {
	//@Id
	//private String id;
	@Transient
	public static final String SEQUENCE_NAME="csv_sequence";

	@Id
	private int id;
	private String csvname;
	private String path;
	private List<Csv> fields;
	private List<Compar> field;



}
