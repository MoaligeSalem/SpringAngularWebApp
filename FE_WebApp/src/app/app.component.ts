import { Component, ViewChild } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { ColumnApi, GridApi } from 'ag-grid';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  template:`

 
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pro';
  gridApi:GridApi;
  gridColumnApi:ColumnApi;
  topRow=[];
  searchValue;
  columnDefs=[
    {
      headerName:"id",
      field:"id",
      width:190,
      rowGroupIndex:1,      
      filter:'agTextColumnFilter',

      
    },{
      headerName:"bookName",
      field:"bookName",
      width:90,
      filter:'agNumberColumnFilter',
    },
    /*
    {
      headerName:"Country",
      field:"country",
      width:190,
      rowGroupIndex:1,      
      filter:'agTextColumnFilter',

      
    },{
      headerName:"Age",
      field:"age",
      width:90,
      filter:'agNumberColumnFilter',
    },
   {
      headerName:"Date",
      field:"date",
      width:90,
      filter:'agDateColumnFilter',

    },
    {
      headerName:"Year",
      field:"year",
      width:90,
    },
    {
      headerName:"Gold",
      field:"gold",
      width:90,
    },
    {
      headerName:"Silver",
      field:"silver",
      width:90,
    },
    {
      headerName:"Total",
      field:"total",
      width:90,
    }
    */
  ];
  autoGroupColumnDef={
    headerName:'book',
    field:'book',
    cellRenderer:'agGroupCellRenderer',
    cellRendererParams:{
      checkbox:true,
     },
     
  }
 /* constructor(){
    this.columnDefs=[
      {
        headerName:"Name",
        field:"firstName",
        width:150,
        sortingOrder:["asc","desc"],
        filter:true
      },
      {
        headerName:"Age",
        field:"age",
        width:150,
      }
    ]
  }
  onGridReady(params){
    this.gridApi=params.api;
    this.gridColumnApi=params.gridColumnApi;
    let dataValue=[{"firstName":"Moalige","age":23},{"firstName":"salem","age":22}];
    params.api.setRowData(dataValue);

  }
  gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true
    }
  }*/
  constructor(private http:HttpClient,private router:Router){};
  onGridReady(params){
    //let dataValue=[{"firstName":"Moalige","age":23}]
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.http
    .get("http://localhost:8080/findAllBooks")
    .subscribe(data=>{
      params.api.setRowData(data);
    })

  }
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
      this.router.navigate([`uploadFiles`])
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
