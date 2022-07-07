package com.mentor.spring.mongo.api.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString

public class Csv {
    private  String name;
    private String  design_Leakage_Power;
    private String  design_Internal_Power;
    private String  design_Switching_Power;
    private String  design_Total_Power;
    private String  combinational_Leakage_Power;
    private String  combinational_Internal_Power;
    private  String  combinational_Switching_Power;
    private  String  combinational_Total_Power;
    private  String  register_Leakage_Power;
    private  String  register_Internal_Power;
    private  String  register_Switching_Power;
    private  String  register_Total_Power;
    private  String  memory_Leakage_Power;
    private  String  memory_Internal_Power;
    private  String  memory_Switching_Power;
    private  String  memory_Total_Power;
    private  String  clock_Network_Leakage_Power;
    private  String  clock_Network_Internal_Power;
    private  String  clock_Network_Switching_Power;
    private  String  clock_Network_Total_Power;



    public Csv(String name, String design_leakage_power, String design_internal_power, String design_switching_power, String design_total_power, String combinational_leakage_power, String combinational_internal_power, String  combinational_Switching_Power, String  combinational_Total_Power, String register_Leakage_Power, String register_Internal_Power, String register_Switching_Power, String register_Total_Power, String memory_Leakage_Power, String memory_Internal_Power, String memory_Switching_Power, String memory_Total_Power, String clock_Network_Leakage_Power, String clock_Network_Internal_Power, String clock_Network_Switching_Power,String clock_Network_Total_Power ) {

        this.name = name;
        this.design_Leakage_Power = design_leakage_power;
        this.design_Internal_Power = design_internal_power;
        this.design_Switching_Power = design_switching_power;
        this.design_Total_Power = design_total_power;
        this.combinational_Leakage_Power = combinational_leakage_power;
        this.combinational_Internal_Power = combinational_internal_power;
        this.combinational_Switching_Power =  combinational_Switching_Power;
        this.combinational_Total_Power =  combinational_Total_Power;
        this.register_Leakage_Power = register_Leakage_Power;
        this.register_Internal_Power = register_Internal_Power;
        this.register_Switching_Power = register_Switching_Power;
        this.register_Total_Power = register_Total_Power;
        this.memory_Leakage_Power = memory_Leakage_Power;
        this.memory_Internal_Power = memory_Internal_Power;
        this.memory_Switching_Power = memory_Switching_Power;
        this.memory_Total_Power = memory_Total_Power;
        this.clock_Network_Leakage_Power = clock_Network_Leakage_Power;
        this.clock_Network_Internal_Power = clock_Network_Internal_Power;
        this.clock_Network_Switching_Power = clock_Network_Switching_Power;
        this.clock_Network_Total_Power=clock_Network_Total_Power;



    }

    public Csv() {
    }
}
