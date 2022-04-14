package com.javatechie.spring.mongo.api.model;

import lombok.ToString;
import org.springframework.data.annotation.Id;
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
	private String csvname;
	private String path;
	//private List<Csv> csvs;

	private String  name;
	private String   Design_Leakage_Power;
	private String  Design_Internal_Power;
	private String  Design_Switching_Power;
	private String Design_Total_Power;
	private String Combinational_Leakage_Power;
	private String  Combinational_Internal_Power;


}
