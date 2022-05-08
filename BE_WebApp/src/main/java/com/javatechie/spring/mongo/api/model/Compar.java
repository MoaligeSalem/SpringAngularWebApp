package com.javatechie.spring.mongo.api.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@ToString

@Document(collection="Compar")
public class Compar {
    private  String INSTANCES;
    private double  RTL_OLD_PA_DESIGN1;
    private  String RTL_NEW_PA_DESIGN1;
    private String  Diff1;
    private String  RTL_OLD_PA_DESIGN2;
    private String  RTL_NEW_PA_DESIGN2;
    private String  Diff2;
    private String  RTL_OLD_PA_DESIGN3;
    private String  RTL_NEW_PA_DESIGN3;
    private  String  Diff3;
    private  String  RTL_OLD_PA_DESIGN4;
    private  String  RTL_NEW_PA_DESIGN4;
    private  String  Diff4;




    public Compar(String INSTANCES, double RTL_OLD_PA_DESIGN1,String RTL_NEW_PA_DESIGN1, String Diff1, String RTL_OLD_PA_DESIGN2,String RTL_NEW_PA_DESIGN2, String Diff2,String RTL_OLD_PA_DESIGN3, String RTL_NEW_PA_DESIGN3,String Diff3, String RTL_OLD_PA_DESIGN4,String RTL_NEW_PA_DESIGN4,String Diff4) {

        this.INSTANCES = INSTANCES;
        this.RTL_OLD_PA_DESIGN1 = RTL_OLD_PA_DESIGN1;
        this.RTL_NEW_PA_DESIGN1 = RTL_NEW_PA_DESIGN1;
        this.Diff1 = Diff1;
        this.RTL_OLD_PA_DESIGN2 = RTL_OLD_PA_DESIGN2;
        this.RTL_NEW_PA_DESIGN2 = RTL_NEW_PA_DESIGN2;
        this.Diff2 = Diff2;
        this.RTL_OLD_PA_DESIGN3 = RTL_OLD_PA_DESIGN3;
        this.RTL_NEW_PA_DESIGN3 = RTL_NEW_PA_DESIGN3;
        this.Diff3 = Diff3;
        this.RTL_OLD_PA_DESIGN4 = RTL_OLD_PA_DESIGN4;
        this.RTL_NEW_PA_DESIGN4 = RTL_NEW_PA_DESIGN4;
        this.Diff4 = Diff4;





    }

    public Compar() {
    }
}