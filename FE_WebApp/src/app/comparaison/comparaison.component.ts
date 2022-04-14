import { HttpClient } from '@angular/common/http';
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
  gridColumnApi:ColumnApi;
  topRow=[];
  searchValue;
  columnDefs=[
    {
      headerName:"csvname",
      field:"csvname",
      width:190,
      rowGroupIndex:1,      
      filter:'agTextColumnFilter',

      
    },{
      headerName:"path",
      field:"path",
      width:90,
      filter:'agNumberColumnFilter',
    },{
      headerName:"name",
      field:"name",
      width:90,
      filter:'agNumberColumnFilter',
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
