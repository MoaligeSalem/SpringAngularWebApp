package com.javatechie.spring.mongo.api.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString
//@Document(collection="Book")

public class Csv {
    private String name;
    private String  Design_Leakage_Power;
    private String  Design_Internal_Power;
    private String  Design_Switching_Power;
    private String  Design_Total_Power;
    private String  Combinational_Leakage_Power;
    private String  Combinational_Internal_Power;
    /*private String  Combinational_Switching_Power;
    private String  Combinational_Total_Power;
    private String  Register_Leakage_Power;
    private String  Register_Internal_Power;
    private String  Register_Switching_Power;
    private String  Register_Total_Power;
    private String  Memory_Leakage_Power;
    private String  Memory_Internal_Power;
    private String  Memory_Switching_Power;
    private String  Memory_Total_Power;
    private String  Clock_Network_Leakage_Power;
    private String  Clock_Network_Internal_Power;
    private String  Clock_Network_Switching_Power;
    private String Clock_Network_Total_Power;*/
}
