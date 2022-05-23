import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi } from 'ag-grid';
import { ColDef, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-comparaison',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.css']
})
export class ComparaisonComponent implements OnInit {
   public columnDefs$!: Observable<ReadonlyArray<any>>;

     public rowData$!: Observable<ReadonlyArray<any>>;
  //jsonObject: JSON;


  

  // arrayObj: any = [
  //   {
  //     id: 1,
  //     GATE_PA: "",
  //     RTL_NEW_PA: 'data.rtl_OLD_PA_DESIGN1[1]',
  //     RTL_OLD_PA: ''
  //   },
  //   {
  //     id: 2,
  //     name: "Franc",
  //     lastModified: '2001-01-01 02:00:00'
  //   },
  //   {
  //     id: 3,
  //     name: "Andrew",
  //     lastModified: '2021-01-01 02:00:00'
  //   },
  //   {
  //     id: 11,
  //     name: "Mark",
  //     lastModified: '2020-01-01 02:00:00'
  //   },
  //   {
  //     id: 12,
  //     name: "Eric",
  //     lastModified: '2020-02-01 02:00:00'
  //   },
  //   {
  //     id: 8,
  //     name: "Tony",
  //     lastModified: '1990-01-01 02:00:00'
  //   }
  // ]

  title = 'pro';
  gridApi:GridApi;
  gridApi1:GridApi;

  gridColumnApi:ColumnApi;
  gridColumnApi1:ColumnApi;
  

  topRow=[];

  searchValue;
  
  colu=[
    {
      headerName:"COMPONENTS",
      minWidth:180,
      
     field:'Instances',
     //valueGetter: 'data.fields[1].name',
     cellStyle: {
      backgroundColor: 'AliceBlue', 
      fontWeight: 'bold' 
  },
  sortable: false,
  editable: true,

      width:105,
      filter:'agNumberColumnFilter',
    },
    {
      headerName:"POWER NUMBERS",
      filter:'agNumberColumnFilter',
      children:[
        {
        field:'Instances',
        //valueGetter: 'data.rtl_OLD_PA_DESIGN1[1]',

         width:136,},
        {headerName:"RTL_NEW_PA",field:'DesignLeakagePath1', width:138,},
        {     field:'sd', hide:'true',
         minwidth:100,}

            ]
    },


       
];
// rowData = [
//   { make: 'Design total' },
//   { make: 'Design switching' },
//   { make: 'Design leakage' },
//   { make: 'Design intenal' },
//   { make: 'Combinational total' },
//   { make: 'Combinational switching' },
//   { make: 'Combinational leakage' },
//   { make: 'Combinational intenal' },
//   { make: 'Register total' },
//   { make: 'Register switching' },
//   { make: 'Register leakage' },
//   { make: 'Register intenal' },
//   { make: 'Memory total' },
//   { make: 'Memory switching' },
//   { make: 'Memory leakage' },
//   { make: 'Memory intenal' }
// ];


    // {
    //   headerName:"Internal Power",
    //   //field:"fields",
    //   filter:'agNumberColumnFilter',
    //   children:[
    //     {headerName:"RTL_OLD_PA_DES",field:'rtl_OLD_PA_DESIGN2', width:136,},
    //     {headerName:"RTL_NEW_PA_DES",field:'rtl_NEW_PA_DESIGN2', width:138,},
    //     {headerName:"Diff%",field:'diff2', width:72,}

    //   ]
    // },
    // {
    //   headerName:"Switching Power",
    //   //field:"fields",
    //   filter:'agNumberColumnFilter',
    //   children:[
    //     {headerName:"RTL_OLD_PA_DES",field:'rtl_OLD_PA_DESIGN3', width:136,},
    //     {headerName:"RTL_NEW_PA_DES",field:'rtl_NEW_PA_DESIGN3', width:138,},
    //     {headerName:"Diff%",field:'diff3', width:72,}

    //   ]
    // },
    // {
    //   headerName:"Total Power",
    //   //field:"fields",
    //   filter:'agNumberColumnFilter',
    //   children:[
    //     {headerName:"RTL_OLD_PA_DES",field:'rtl_OLD_PA_DESIGN4', width:138,},
    //     {headerName:"RTL_NEW_PA_DES",field:'rtl_NEW_PA_DESIGN4', width:138,},
    //     {headerName:"Diff%",field:'diff4', width:72,}
    //   ]
    // }
  
  
  
  
  columnDefs=[
    // {
    //   headerName:"csvname",
    //   field:"csvname",
    //   width:90,
    //   rowGroupIndex:1,      
    //   filter:'agTextColumnFilter',

      
    // },{
    //   headerName:"path",
    //   field:"path",
    //   width:90,
    //   filter:'agNumberColumnFilter',
    // },
    {
      headerName:"INSTANCES",
      
     field:'Instances',
     //valueGetter: 'data[0].instances',
     cellStyle: {
      backgroundColor: 'AliceBlue', 
      fontWeight: 'bold' 
  },
     
      width:105,
      filter:'agNumberColumnFilter',
    },
    {
      headerName:"Leakage Power",
      //field:'fields',
      filter:'agNumberColumnFilter',
      children:[
        {headerName:"RTL_OLD_PA_DES",field:'DesignLeakagePath1', width:136, },
        {headerName:"RTL_NEW_PA_DES",field:'DesignLeakagePath1', width:138,},
        {headerName:"Diff%",      valueGetter: abValueGetter,
         width:72,}

            ]
    },

       

    {
      headerName:"Internal Power",
      //field:"fields",
      filter:'agNumberColumnFilter',
      children:[
        {headerName:"RTL_OLD_PA_DES",field:'rtl_OLD_PA_DESIGN2', width:136,},
        {headerName:"RTL_NEW_PA_DES",field:'rtl_NEW_PA_DESIGN2', width:138,},
        {headerName:"Diff%",field:'diff2', width:72,}

      ]
    },
    {
      headerName:"Switching Power",
      //field:"fields",
      filter:'agNumberColumnFilter',
      children:[
        {headerName:"RTL_OLD_PA_DES",field:'rtl_OLD_PA_DESIGN3', width:136,},
        {headerName:"RTL_NEW_PA_DES",field:'rtl_NEW_PA_DESIGN3', width:138,},
        {headerName:"Diff%",field:'diff3', width:72,}

      ]
    },
    {
      headerName:"Total Power",
      //field:"fields",
      filter:'agNumberColumnFilter',
      children:[
        {headerName:"RTL_OLD_PA_DES",field:'rtl_OLD_PA_DESIGN4', width:138,},
        {headerName:"RTL_NEW_PA_DES",field:'rtl_NEW_PA_DESIGN4', width:138,},
        {headerName:"Diff%",field:'diff4', width:72,}
      ]
    }
   ];
  autoGroupColumnDef={
    headerName:'runs',
    field:'book',
    cellRenderer:'agGroupCellRenderer',
    cellRendererParams:{
      checkbox:true,
     },
     
  }
  aggFuncs: { aa: (params: any) => number; };
  constructor(private http:HttpClient,private router:Router){}
  ngOnInit(){}
;

onSelectionChanged() {
  var selectedRows = this.gridApi.getSelectedRows();
  var selectedRows1 = this.gridApi1.getSelectedRows();
  console.log(selectedRows);
  console.log(selectedRows1);
}
  // onGridReady(params){
  //   this.gridApi = params.api;
  //   this.gridColumnApi = params.columnApi;
  //   this.http
  //   .get("http://localhost:8080/findAllBookss")
  //   .subscribe(data=>{(data)
  //     params.api.setRowData(data);
  //   })

  // }

  // onGridReady1(params){
  //   this.gridApi1 = params.api;
  //   this.gridColumnApi1 = params.columnApi;
  //   this.http
  //   .get("http://localhost:8080/importCSV/path?pathh=C%3A%5CUsers%5Ctnimeh3t%5CDesktop%5CRTL_OLD_PA%20.csv&csvname=RTL")
  //   .subscribe(data=>{
  //     params.api.setRowData(data);
  //   })
    
  // }
 
  

  getRowData() {
   let rowData = Array();
    this.gridApi.forEachNode(node => rowData.push(node.data));
    //console.log(rowData)
    const a = rowData.map(row => row=[{ m: 'Design total' },
    { m: 'Design switching' },
    { m: 'Design leakage' },
    { m: 'Design intenal' },
    { m: 'Combinational total' },
    { m: 'Combinational switching' },
    { m: 'Combinational leakage' },
    { m: 'Combinational intenal' },
    { m: 'Register total' },
    { m: 'Register switching' },
    { m: 'Register leakage' },
    { m: 'Register intenal' },
    { m: 'Memory total' },
    { m: 'Memory switching' },
    { m: 'Memory leakage' },
    { m: 'Memory intenal' }]);
    //console.log(a);
  }
  
 
  //  onGridReady=(params)=>{
  //   console.log("grid is ready")
  //   fetch("http://localhost:8080/findAllBookss").then(resp=>resp.json())
  //   .then(resp=>{console.log(resp)
  //     params.api.applyTransaction({add:resp})})
  // }
  

  onGridReady1=(params)=>{
    console.log("grid is ready")
    fetch("http://localhost:8080/importCSV/path?pathh=C%3A%5CUsers%5Ctnimeh3t%5CDesktop%5CRTL_OLD_PA%20.csv&csvname=RTL").then(resp=>resp.json())
    .then(resp=>{console.log(resp)
      params.api.applyTransaction({add:resp})})
      
    
  }



//   JSONArray jsonArray = new JSONArray();

// for (loop) {
//     JSONObject jsonObj= new JSONObject();
//     jsonObj.put("srcOfPhoto", srcOfPhoto);
//     jsonObj.put("username", "name"+count);
//     jsonObj.put("userid", "userid"+count);

//     jsonArray.put(jsonObj.valueToString());
// }


  
  gridOptions = {
    //sideBar: 'columns',
    colmunsTypes:{
      editable:true,
      valueParser: function(para){
        return parseInt(para.newValue);
      },
    },
    filter:'agTextColumnFilter',
    filterParams: {
      buttons: ['reset', 'apply'],
      debounceMs: 200
    },
    defaultColDef:{
      enableRowGroup: true,
      sortable:true,
      resizable: true,
      editable:true,
    },
    rowGroupPanelShow:'always',
    rowData: null,
    enableCharts:true,
    suppressDragLeaveHideesColumns:true,
    suppressRowClickSelection: true,
    enableRangeSelection:true,
    animateRows:true,
    columnDefs:this.columnDefs,
    groupHidenOpenParents:true,


    
  }
  

  
  onDeleteRow(){
    if (confirm('Are you sure you want to delete the selected rows?')) {
      const selectedData=this.gridApi.getSelectedRows();
      this.gridApi.updateRowData({remove:selectedData});
      this.router.navigate([`comparaison`])
    }

  }
  pinTopRow(){
    const selectedData=this.gridApi.getSelectedRows();
    this.gridApi.setPinnedTopRowData(selectedData);
  }
  unpinTopRow(){
    this.gridApi.setPinnedTopRowData([]);
    console.log('msg')
  }
  quickSearch(){
    this.gridApi.setQuickFilter(this.searchValue)
  } 
  

  
}


function abValueGetter(params: ValueGetterParams) {
  return ((params.data.rtl_OLD_PA_DESIGN1 - params.data.rtl_NEW_PA_DESIGN1)/params.data.rtl_OLD_PA_DESIGN1)*100 +"%";
}


var i;
  var row, cell1, cell2;
  var len=document.getElementsByClassName('component').length
  var component=document.getElementsByClassName('component')
  var average1=document.getElementsByClassName('average1')
  var stddev1=document.getElementsByClassName('stddev1')
  var rmse1=document.getElementsByClassName('rmse1')
  var average2=document.getElementsByClassName('average2')
  var stddev2=document.getElementsByClassName('stddev2')
  var rmse2=document.getElementsByClassName('rmse2')
  var ref_pwr=document.getElementsByClassName('ref_pwr')
  var comp1_pwr=document.getElementsByClassName('comp1_pwr')
  var comp2_pwr=document.getElementsByClassName('comp2_pwr')


  for (i=1; i<len; i++) {
    
    var diff1 = Math.abs(Number(average1[i].innerHTML)) - Math.abs(Number(average2[i].innerHTML));
    var diff2 = Math.abs(Number(stddev1[i].innerHTML)) - Math.abs(Number(stddev2[i].innerHTML));
    var rmse_arry1 = rmse1[i].innerHTML.split(" ")
    var rmse_arry2 = rmse2[i].innerHTML.split(" ")
    var diff3 = Math.abs(Number(rmse_arry1[0])) - Math.abs(Number(rmse_arry2[0]));

    var C1 = Math.floor(diff1);
    var C2 = Math.floor(diff2);  
    var C3 = Math.floor(diff3);

    // if (C1 > 0.1 ) { 
    //   if ( Math.abs(Number(average1[i].innerHTML)) > 10 ) {
    //     average1[i].style.color = "red"}; 
    //     if ( Math.abs(Number(average2[i].innerHTML)) > 10 ) {
    //       average2[i].style.color = "green"};
    //     }
    // else if  (C1 < -0.1 )  {
    //    if ( Math.abs(Number(average1[i].innerHTML)) > 10 ) {
    //      average1[i].style.color = "green"}; 
    //      if ( Math.abs(Number(average2[i].innerHTML)) > 10 ) {
    //        average2[i].style.color = "red"};
    //       }   
    // if (C2 > 0.1 ) {
    //    if ( Math.abs(Number(stddev1[i].innerHTML)) > 10 ) {
    //      stddev1[i].style.color = "red"}; 
    //      if ( Math.abs(Number(stddev2[i].innerHTML)) > 10 ) {
    //        stddev2[i].style.color = "green"};
    //       }
    // else if  (C2 < -0.1 )  { 
    //   if ( Math.abs(Number(stddev1[i].innerHTML)) > 10 ) {
    //     stddev1[i].style.color = "green"}; 
    //     if ( Math.abs(Number(stddev2[i].innerHTML)) > 10 ) {
    //       stddev2[i].style.color = "red"};
    //     }   
    // if (C3 > 0.1 ) {
    //    rmse1[i].style.color = "red";
    //    rmse2[i].style.color = "green";
    //   }
    // else if  (C3 < -0.1 )  { 
    //   rmse1[i].style.color = "green";rmse2[i].style.color = "red";
    // }   
  }


  

