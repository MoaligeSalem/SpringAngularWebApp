import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi } from 'ag-grid';

@Component({
  selector: 'app-comparaison',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.css']
})
export class ComparaisonComponent implements OnInit {

  title = 'pro';
  gridApi:GridApi;
  gridApi1:GridApi;

  gridColumnApi:ColumnApi;
  gridColumnApi1:ColumnApi;

  topRow=[];

  searchValue;
  colu=[
    {
      headerName:"INSTANCES",
      
     field:'instances',
     //valueGetter: 'data.fields[1].name',

     
      width:105,
      filter:'agNumberColumnFilter',
    },

    {
      headerName:"INSTANCES",
      
     //field:'rtl_OLD_PA_DESIGN1',
     //valueGetter: 'data.fields[1].name',

     
      width:105,
      filter:'agNumberColumnFilter',
      aggFucn:"sum",
      valueParser: "Number(newValue)",

      
    },
    

  ]
  
  
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
      
     field:'instances',
     //valueGetter: 'data.fields[1].name',

     
      width:105,
      filter:'agNumberColumnFilter',
    },
    {
      headerName:"Leakage Power",
      //field:'fields',
      filter:'agNumberColumnFilter',
      children:[
        {headerName:"RTL_OLD_PA_DES",field:'rtl_OLD_PA_DESIGN1', width:136,},
        {headerName:"RTL_NEW_PA_DES",field:'rtl_NEW_PA_DESIGN1', width:138,},
        {headerName:"Diff%",field:'diff1', width:72,}

            ]
    },
    {
      headerName:"Internal Power",
      //field:"fields",
      filter:'agNumberColumnFilter',
      children:[
        {headerName:"RTL_OLD_PA_DES",field:'rtl_OLD_PA_DESIGN2', width:136,},
        {headerName:"RTL_NEW_PA_DES",field:'rtl_NEW_PA_DESIGN2', width:137,},
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
  constructor(private http:HttpClient,private router:Router){}
  ngOnInit(){}
;

onSelectionChanged() {
  var selectedRows = this.gridApi.getSelectedRows();
  var selectedRows1 = this.gridApi1.getSelectedRows();
  console.log(selectedRows);
  console.log(selectedRows1);
}
  onGridReady(params){
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http
    .get("http://localhost:8080/findAllBookss")
    .subscribe(data=>{
      params.api.setRowData(data);
    })

  }

  onGridReady1(params){
    this.gridApi1 = params.api;
    this.gridColumnApi1 = params.columnApi;
    this.http
    .get("http://localhost:8080/findAllBookss")
    .subscribe(data=>{
      params.api.setRowData(data);
    })

  }

  //  onGridReady=(params)=>{
  //   console.log("grid is ready")
  //   fetch("http://localhost:8080/findAllBookss").then(resp=>resp.json())
  //   .then(resp=>{console.log(resp)
  //     params.api.applyTransaction({add:resp})})
  // }

  // onGridReady1=(params)=>{
  //   console.log("grid is ready")
  //   fetch("http://localhost:8080/findAllBookss").then(resp=>resp.json())
  //   .then(resp=>{console.log(resp)
  //     params.api.applyTransaction({add:resp})})
  // }


  
  gridOptions = {
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

