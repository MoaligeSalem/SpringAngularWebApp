import { HttpClient, HttpParams } from '@angular/common/http';
import { STRING_TYPE } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnApi, GridApi } from 'ag-grid';
import { ColDef, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { DataService } from '../data.service';
import { home } from '../Model/homeModel';
import { UploadFilesComponent } from '../upload-files/upload-files.component';


@Component({
  selector: 'app-comparaison',
  templateUrl: './comparaison.component.html',
  styleUrls: ['./comparaison.component.css']
})
export class ComparaisonComponent implements OnInit {


     object=""
     object2=""
   
     userObject=""
     a:number
     constructor(private http:HttpClient,private router:Router,private dataService: DataService){ 
       this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
       const userObject = JSON.parse(this.object)
       console.log(userObject)
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
        console.log(a)

     }

  title = 'pro';
  gridApi:GridApi;
  gridApi1:GridApi;

  gridColumnApi:ColumnApi;
  gridColumnApi1:ColumnApi;


   table: Array<{field: string, headerName: string,width:number}>=[]
//   table = [{field:'' , headerName:'',width:0,
// //   cellStyle: {
// //     backgroundColor: '', 
// //      fontWeight: '' 
// //  }
// }];
table2: Array<{field: string, headerName: string,width:number}>=[]
//table2= [{ field:'Diff%', valueGetter:this.calculDiff}];
table3: Array<{field: string, headerName: string,width:number}>=[]
table4: Array<{field: string, headerName: string,width:number}>=[]
table5: Array<{field: string, headerName: string,width:number}>=[]
table6: Array<{field: string, headerName: string,width:number}>=[]
table7: Array<{field: string, headerName: string,width:number}>=[]
table8: Array<{field: string, headerName: string,width:number}>=[]
table9: Array<{field: string, headerName: string,width:number}>=[]
table10: Array<{field: string, headerName: string,width:number}>=[]
table11: Array<{field: string, headerName: string,width:number}>=[]
table12: Array<{field: string, headerName: string,width:number}>=[]
table13: Array<{field: string, headerName: string,width:number}>=[]
table14: Array<{field: string, headerName: string,width:number}>=[]
table15: Array<{field: string, headerName: string,width:number}>=[]
table16: Array<{field: string, headerName: string,width:number}>=[]
table17: Array<{field: string, headerName: string,width:number}>=[]
table18: Array<{field: string, headerName: string,width:number}>=[]
table19: Array<{field: string, headerName: string,width:number}>=[]
table20: Array<{field: string, headerName: string,width:number}>=[]
topRow=[]
   aa = this.userObject.slice(1,2);

  searchValue;

  sum=[{field:'',headerName:'',width:0}]

  onGridReady2(params){
    this.gridApi1 = params.api;
      this.gridColumnApi1 = params.columnApi;
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
     const userObject = JSON.parse(this.object)
     const aa = userObject.slice(1,2)
      params.api.setRowData(this.colu)
     // params.api.setRowData(aa);
      params.api.setRowData(this.rowData);


  }
  onGridReady1(params){
    this.gridApi1 = params.api;
      this.gridColumnApi1 = params.columnApi;
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
     const userObject = JSON.parse(this.object)
     const userObject1 = userObject.slice(1,)
       params.api.setRowData(userObject1);

      // const colDefs = params.api.getColumnDefs();
      //   colDefs.length=0;
      //   for(let i=0;i<userObject[0].length;i++){
      //   const keys = Object.values(userObject[0][i])
      //   //console.log(this.object[0])
      //   keys.forEach(key => colDefs.push({field : key}));
      //   params.api.setColumnDefs(colDefs);
      //   }
        
  //      // params.api.setRowData(this.object);
    
    
  }

  // { a:'Design leakage' },

  //    { a:'Design intenal '},
  //    { a:'Design total' },
  //    { a:'Design switching'},
  //    { a: 'Combinational leakage ' },
  //    { a:'Combinational intenal ' },
  //    {a: 'Combinational switching'} ,
  //    { a: 'Combinational total ' },
  //    { a:  'Register leakage ' },
  //    { a: 'Register intenal '} ,
  //    {  a:'Register switching'} ,
  //    { a:'Register total' },
  //    { a: 'Memory leakage ' },
  //    { a: 'Memory intenal '},
  //    { a:'Memory switching' },
  //    { a: 'Memory total' },
  //    { a: 'Clock leakage' },
  //    { a: 'Clock intenal ' },
  //    { a: 'Clock switching ' },
  //   {  a:'Clock total' },

 rowData1=[

  'Design leakage' ,

    'Design intenal ',
     'Design total' ,
    'Design switching',
      'Combinational leakage ' ,
    'Combinational intenal ' ,
      'Combinational switching' ,
     'Combinational total ' ,
      'Register leakage ' ,
     'Register intenal ' ,
     'Register switching' ,
    'Register total' ,
    'Memory leakage ' ,
      'Memory intenal ',
    'Memory switching' ,
     'Memory total', 
     'Clock leakage' ,
    'Clock intenal ' ,
     'Clock switching ',
    'Clock total'
  ]
  ;



  // rowData=[
  
  //   { a:'Design leakage' },

  //   { a:'Design intenal '},
  //   { a:'Design total',s:'' },
  //   { a:'Design switching',s:''},
  //   { a: 'Combinational leakage ',s:'' },
  //   { a:'Combinational intenal ' ,s:''},
  //   {a: 'Combinational switching',s:''} ,
  //   { a: 'Combinational total ' ,s:''},
  //   { a:  'Register leakage ' ,s:''},
  //   { a: 'Register intenal ',s:''} ,
  //   {  a:'Register switching',s:''} ,
  //   { a:'Register total' ,s:''},
  //   { a: 'Memory leakage ',s:'' },
  //   { a: 'Memory intenal ',s:''},
  //   { a:'Memory switching' ,s:''},
  //   { a: 'Memory total' ,s:''},
  //   { a: 'Clock leakage' ,s:''},
  //   { a: 'Clock intenal ',s:'' },
  //   { a: 'Clock switching ',s:'' },
  //  {  a:'Clock total',s:'' },

  //  // {s:this.aa[5]}
  // ]
  // ;

// rowData=[
//   {s:''}
// ]

rowData: Array<{ s: string}>=[]


//   getSum(){   
//     this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
//    const userObject = JSON.parse(this.object)
//   // const userObject1 = userObject.slice(1,)

//    console.log(userObject[0].length)
//     this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
//     const a = JSON.parse(this.object2)

//     //this.dataS2=[]   
//     console.log(a)
//     for (let index = 1; index <= a; index++) { 
//       //for(let i=1;i<userObject[0].length;i++){
   
//       //console.log(userObject[index])  
//     this.rowData.unshift(              
//   {
//    a:'kjh'
// //    cellStyle: {
// //     backgroundColor: '', 
// //      fontWeight: '' 
// //  }
// }  ,)}     
//      return this.rowData }
  getCo(){
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    const userObject12 = userObject.slice(1,2)
   // console.log(userObject12[0][4])
    //console.log(userObject.slice(1,2)) 
    
     this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
     const a = JSON.parse(this.object2)
     //for (let i = 0; i <this.rowData1.length; i++) { 

     for (let index = 1; index <userObject[0].length; index+=a+(a-1)) { 
       


       this.rowData.push(              
 // { s:userObject12[index]})
  {s:userObject12[0][index]})

  //{ field:index.toString()})


}  
//for(let i=1;i<=a;i++){
     return {field:'s'}
   //  return
  }
  colu=[
    {
      headerName:"COMPONENTS",
      //minWidth:180,
      
     field:'a',
     //valueGetter: 'data.fields[1].name',
     cellStyle: {
      backgroundColor: 'AliceBlue', 
      fontWeight: 'bold' 
  },
  sortable: false,
  editable: true,
    },
    {
      headerName:"POWER NUMBERS",
      children:[this.getCo()],
    },
       
];

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
  
  
  
  
  autoGroupColumnDef={
    headerName:'runs',
    field:'book',
    cellRenderer:'agGroupCellRenderer',
    cellRendererParams:{
      checkbox:true,
     },
     
  }
  aggFuncs: { aa: (params: any) => number; };
  UploadFilesComponent: UploadFilesComponent;
 
 // rowData = [this.userObject];
  


  ngOnInit(){
  }
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

   

 // rowData=[{Name: this.userObject[0]}];
  // Index(index){
  //   return index.toString
  // }
  // setHead(){
  //   this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
  //   const userObject = JSON.parse(this.object)
  //   this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
  //   const a = JSON.parse(this.object2)
  //   const colDefs =userObject.getColumnDefs();
  //       colDefs.length=0;
  //       var keys;
  //       for(let i=1;i<=a;i++){
  //        keys = Object.keys(userObject[0][i])}
  //       //console.log(this.object[0])
  //       keys.forEach(key => colDefs.push({headerName : key}));
  //       userObject.setColumnDefs(colDefs);
  // }
 tt=['']
  getTest(){
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    console.log(userObject[0].length)
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)
    for (let index = 1; index <= a; index++) { 
      for(let i=1;i<userObject[0].length;i++){

        this.tt.push(userObject[index][i])
      }}
      console.log(this.tt)
      //return this.tt
  }

  getData1(){   
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
   const userObject = JSON.parse(this.object)
   const aaa = userObject.slice(1,2)
   console.log(aaa[0][5])
   console.log(userObject.slice(1,))
   console.log(userObject[0].length)
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

    //this.dataS2=[]   
    console.log(a)
    for (let index = 1; index <= a; index++) { 
      //for(let i=1;i<userObject[0].length;i++){
   
      //console.log(userObject[index])  
    this.table.push(              
      //headerName:"Leakage power",
   // field: this.userObject[index] 
  {
   field: index.toString(),headerName:(userObject[0][index]).toString() , width:230,
//    cellStyle: {
//     backgroundColor: '', 
//      fontWeight: '' 
//  }
}  ,)} 
  //{field:'Diff'}         
  for (let index = a+1; index <2*a; index++) { 
    this.table.push(  {headerName:(userObject[0][index]).toString() ,field:index.toString(), width:230,
  //   cellStyle: {
  //     backgroundColor: '', 
  //      fontWeight: 'bold' 
  //  }
  }   )          
   }
     
     return this.table  }

     getData2(){   
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      const userObject = JSON.parse(this.object)
      console.log(userObject)
      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      //this.dataS2=[]   
      console.log(a)
      for (let index = 2*a; index < 3*a; index++) {   
        //console.log(userObject[index])  
      this.table2.push(              
      
     // headerName:(index+1)*10,       
    //headerName:"Leakage power",
     // field: this.userObject[index] 
     {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}  
           //field: this.userObject[index],       
   
      )   
      
       } 
       for (let index = 3*a; index <4*a-1; index++) { 
        this.table2.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230} )
        //this.table2.push(  {field:'Diff%'} )          
          
       } 
       return this.table2  }

       getData3(){   
        this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
        const userObject = JSON.parse(this.object)
        console.log(userObject)
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
    
        //this.dataS2=[]   
        console.log(a)
        for (let index = 4*a-1; index < 5*a-1; index++) {   
          //console.log(userObject[index])  
        this.table3.push(              
        
      //headerName:"Leakage power",
       // field: this.userObject[index] 
       {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}      
        //field: this.userObject[index],       
   
        )   
        
         } 
         for (let index = 5*a-1; index < 6*a-2; index++) { 
          this.table3.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
         } 
         return this.table3  }

         getData4(){   
          this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          const userObject = JSON.parse(this.object)
          console.log(userObject)
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          //this.dataS2=[]   
          console.log(a)
          for (let index = 6*a-2; index < 7*a-2; index++) {   
            //console.log(userObject[index])  
          this.table4.push(              
          
        //headerName:"Leakage power",
         // field: this.userObject[index] 
         {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}     
          //field: this.userObject[index],       
      
          )   
          
           }  
           for (let index = 7*a-2; index < 8*a-3; index++) { 
            this.table4.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
           } 
           return this.table4  }


  columnDefs=[
    {headerName:"Instances",field:'0', cellStyle: {
       backgroundColor: 'AliceBlue', 
        fontWeight: 'bold' 
    },},
    //{headerName:this.getData(), field:this.getData()}
    {headerName:"Total power", children:this.getData4()},

    {headerName:"Leakage power",children:this.getData1()},
    {headerName:"Internal power", children:this.getData2()},
    {headerName:"Switching power", children:this.getData3()},
  //   // {
  //   //   headerName:"csvname",
  //   //   field:"csvname",
  //   //   width:90,
  //   //   rowGroupIndex:1,      
  //   //   filter:'agTextColumnFilter',

      
  //   // },{
  //   //   headerName:"path",
  //   //   field:"path",
  //   //   width:90,
  //   //   filter:'agNumberColumnFilter',
  //   // },
  //  {
    //  headerName:"INSTANCES",
      
     //valueGetter: 'data.Name',
     //field:'0',
     //cellStyle: {
    //  backgroundColor: 'AliceBlue', 
    //  fontWeight: 'bold' 
 // },
     
       //width:105, 
       //filter:'agNumberColumnFilter',
     //},

     
    //{
      // headerName:"Leakage Power",
      // field : '1',
  //     filter:'agNumberColumnFilter',
    //  children:[
  //       {field:'1', width:136, },
  //       {headerName:Object.keys(this.object)[3],field:Object.keys(this.userObject)[5], width:138,},
  //       {headerName:"Diff%",      valueGetter: abValueGetter,
  //        width:72,}

  //           ]
     //},

       

    //{
      //headerName:"Internal Power",
      //filter:'agNumberColumnFilter',
      //children:[
   //     {field:'jk', width:136,},
     //   {headerName:"RTL_NEW_PA_DES",field:'4', width:138,},
       // {headerName:"Diff%",field:'diff2', width:72,}

      //]
    //},
     //{
      // headerName:"Switching Power",
  //     //field:"fields",
  //     filter:'agNumberColumnFilter',
       //children:[
  //       {headerName:"RTL_OLD_PA_DES",field:'undefined Clock_Network_Internal_Power', width:136,},
  //       {headerName:"RTL_NEW_PA_DES",field:'undefined Clock_Network_Internal_Power', width:138,},
  //       {headerName:"Diff%",field:'diff3', width:72,}

      // ]
     //},
     //{
      //headerName:"Total Power",
  //     //field:"fields",
  //     filter:'agNumberColumnFilter',
       //children:[
  //       {headerName:"RTL_OLD_PA_DES",field:'undefined Clock_Network_Internal_Power', width:138,},
  //       {headerName:"RTL_NEW_PA_DES",field:'undefined Clock_Network_Internal_Power', width:138,},
  //       {headerName:"Diff%",field:'diff4', width:72,}
       //]
     //}
   ];

  




   getData5(){   
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    console.log(userObject)
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

    //this.dataS2=[]   
    console.log(a)
    for (let index = 8*a-3; index < 9*a-3; index++) {    
      //console.log(userObject[index])  
    this.table5.push(              
      //headerName:"Leakage power",
   // field: this.userObject[index] 
  {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}    
    //field: this.userObject[index],         
    )   
    
     }  
     for (let index = 9*a-3; index < 10*a-4; index++) { 
      this.table5.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
     } 
     return this.table5  }

     getData6(){   
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      const userObject = JSON.parse(this.object)
      console.log(userObject)
      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      //this.dataS2=[]   
      console.log(a)
      for (let index = 10*a-4; index < 11*a-4; index++) {   
        //console.log(userObject[index])  
      this.table6.push(              
      
    //headerName:"Leakage power",
     // field: this.userObject[index] 
     {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}  
           //field: this.userObject[index],       
     
      )   
      
       }  
       for (let index = 11*a-4; index < 12*a-5; index++) {
        this.table6.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
       } 
       return this.table6  }

       getData7(){   
        this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
        const userObject = JSON.parse(this.object)
        console.log(userObject)
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
    
        //this.dataS2=[]   
        console.log(a)
        for (let index = 12*a-5; index < 13*a-5; index++) {   
          //console.log(userObject[index])  
        this.table7.push(              
        
      //headerName:"Leakage power",
       // field: this.userObject[index] 
       {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}      
        //field: this.userObject[index],           
        )   
        
         }  
         for (let index = 13*a-5; index < 14*a-6; index++) { 
          this.table7.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
         } 
         return this.table7  }

         getData8(){   
          this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          const userObject = JSON.parse(this.object)
          console.log(userObject)
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          //this.dataS2=[]   
          console.log(a)
          for (let index = 14*a-6; index < 15*a-6; index++) {   
            //console.log(userObject[index])  
          this.table8.push(              
          
        //headerName:"Leakage power",
         // field: this.userObject[index] 
         {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}     
          //field: this.userObject[index],       
           
          )   
          
           }  
           for (let index = 15*a-6; index < 16*a-7; index++) { 
            this.table8.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
           } 
           return this.table8  }


  columnDefs1=[
    {headerName:"Instances",field:'0',cellStyle: {
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },},
    //{headerName:this.getData(), field:this.getData()}
    {headerName:"Total power", children:this.getData8()},

    {headerName:"Leakage power" ,children:this.getData5()},
    {headerName:"Internal power", children:this.getData6()},
    {headerName:"Switching power", children:this.getData7()},

  ]



  getData9(){   
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    console.log(userObject)
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

    //this.dataS2=[]   
    console.log(a)
    for (let index = 16*a-7; index < 17*a-7; index++) {    
      //console.log(userObject[index])  
    this.table9.push(              
    
  //headerName:"Leakage power",
   // field: this.userObject[index] 
  {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}    
    //field: this.userObject[index],       

    )   
    
     }   
     for (let index = 17*a-7; index < 18*a-8; index++) { 
      this.table9.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
     } 
     return this.table9  }

     getData10(){   
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      const userObject = JSON.parse(this.object)
      console.log(userObject)
      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      //this.dataS2=[]   
      console.log(a)
      for (let index = 18*a-8; index <= 19*a-8; index++) {   
        //console.log(userObject[index])  
      this.table10.push(              
      
    //headerName:"Leakage power",
     // field: this.userObject[index] 
     {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}  
           //field: this.userObject[index],       
      

      )   
      
       }  
       for (let index = 19*a-8; index < 20*a-9; index++) { 
        this.table10.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
       } 
       return this.table10  }

       getData11(){   
        this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
        const userObject = JSON.parse(this.object)
        console.log(userObject)
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
    
        //this.dataS2=[]   
        console.log(a)
        for (let index = 20*a-9; index < 21*a-9; index++) {   
          //console.log(userObject[index])  
        this.table11.push(              
        
      //headerName:"Leakage power",
       // field: this.userObject[index] 
       {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}      
        //field: this.userObject[index],       
        
 
        )   
        
         }  
         for (let index = 21*a-9; index < 22*a-10; index++) { 
          this.table11.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
         } 
         return this.table11  }

         getData12(){   
          this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          const userObject = JSON.parse(this.object)
          console.log(userObject)
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          //this.dataS2=[]   
          console.log(a)
          for (let index = 22*a-10; index < 23*a-10; index++) {   
            //console.log(userObject[index])  
          this.table12.push(              
          
        //headerName:"Leakage power",
         // field: this.userObject[index] 
         {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}     
          //field: this.userObject[index],       
 
          )   
          
           }   
           for (let index = 23*a-10; index < 24*a-11; index++) { 
            this.table12.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
           } 
           return this.table12 }


  columnDefs2=[
    {headerName:"Instances",field:'0',cellStyle: {
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },},
    //{headerName:this.getData(), field:this.getData()}
    {headerName:"Total power", children:this.getData12()},

    {headerName:"Leakage power", children:this.getData9()},
    {headerName:"Internal power", children:this.getData10()},
    {headerName:"Switching power", children:this.getData11()},

  ]



  getData13(){   
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    console.log(userObject)
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

    //this.dataS2=[]   
    console.log(a)
    for (let index = 24*a-11; index < 25*a-11; index++) {    
      //console.log(userObject[index])  
    this.table13.push(              
    
  //headerName:"Leakage power",
   // field: this.userObject[index] 
  {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}    
    //field: this.userObject[index],       
    
  
    )   
    
     } 
     for (let index = 25*a-11; index < 26*a-12; index++) { 
      this.table13.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
     } 
     return this.table13  }

     getData14(){   
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      const userObject = JSON.parse(this.object)
      console.log(userObject)
      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      //this.dataS2=[]   
      console.log(a)
      for (let index = 26*a-12; index < 27*a-12; index++) {   
        //console.log(userObject[index])  
      this.table14.push(              
      
    //headerName:"Leakage power",
     // field: this.userObject[index] 
     {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}  
           //field: this.userObject[index],       
     
      )   
      
       }   
       for (let index = 27*a-12; index < 28*a-13; index++) { 
        this.table14.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
       } 
       return this.table14  }

       getData15(){   
        this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
        const userObject = JSON.parse(this.object)
        console.log(userObject)
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
    
        //this.dataS2=[]   
        console.log(a)
        for (let index = 28*a-13; index <29*a-13; index++) {   
          //console.log(userObject[index])  
        this.table15.push(              
        
      //headerName:"Leakage power",
       // field: this.userObject[index] 
       {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}      
        //field: this.userObject[index],       
   
        )   
        
         }   
         for (let index = 29*a-13; index < 30*a-14; index++) { 
          this.table15.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
         } 
         return this.table15  }

         getData16(){   
          this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          const userObject = JSON.parse(this.object)
          console.log(userObject)
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          //this.dataS2=[]   
          console.log(a)
          for (let index = 30*a-14; index < 31*a-14; index++) {   
            //console.log(userObject[index])  
          this.table16.push(              
          
        //headerName:"Leakage power",
         // field: this.userObject[index] 
         {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}     
          //field: this.userObject[index],       
          

          )   
          
           }  
           for (let index = 31*a-14; index < 32*a-15; index++) { 
            this.table16.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
           } 
           return this.table16  }


  columnDefs3=[
    {headerName:"Instances",field:'0',cellStyle: {
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },},
    //{headerName:this.getData(), field:this.getData()}
    {headerName:"Total power", children:this.getData16()},

    {headerName:"Leakage power", children:this.getData13()},
    {headerName:"Internal power", children:this.getData14()},
    {headerName:"Switching power", children:this.getData15()},

  ]



  getData17(){   
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    console.log(userObject)
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

    //this.dataS2=[]   
    console.log(a)
    for (let index = 32*a-15; index <33*a-15; index++) {    
      //console.log(userObject[index])  
    this.table17.push(              
    
  //headerName:"Leakage power",
   // field: this.userObject[index] 
  {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}    
    //field: this.userObject[index],       
    
 
    )   
    
     }  
     for (let index = 33*a-15; index < 34*a-16; index++) { 
      this.table17.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
     } 
     return this.table17  }

     getData18(){   
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      const userObject = JSON.parse(this.object)
      console.log(userObject)
      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      //this.dataS2=[]   
      console.log(a)
      for (let index = 34*a-16; index <35*a-16; index++) {   
        //console.log(userObject[index])  
      this.table18.push(              
      
    //headerName:"Leakage power",
     // field: this.userObject[index] 
     {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}  
           //field: this.userObject[index],       
     
      )   
      
       }  
       for (let index = 35*a-16; index < 36*a-17; index++) { 
        this.table18.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
       } 
       return this.table18  }

       getData19(){   
        this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
        const userObject = JSON.parse(this.object)
        console.log(userObject)
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
    
        //this.dataS2=[]   
        console.log(a)
        for (let index =  36*a-17; index <  37*a-17; index++) {   
          //console.log(userObject[index])  
        this.table19.push(              
        
      //headerName:"Leakage power",
       // field: this.userObject[index] 
       {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}      
        //field: this.userObject[index],       
        
   
        )   
        
         }  
         for (let index = 37*a-17; index < 38*a-18; index++) { 
          this.table19.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
         } 
         return this.table19  }

         getData20(){   
          this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          const userObject = JSON.parse(this.object)
          console.log(userObject)
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          //this.dataS2=[]   
          console.log(a)
          for (let index = 38*a-18; index < 39*a-18; index++) {   
            //console.log(userObject[index])  
          this.table20.push(              
          
        //headerName:"Leakage power",
         // field: this.userObject[index] 
         {field:index.toString(),headerName:(userObject[0][index]).toString(), width:230}     
          //field: this.userObject[index],       

          )   
          
           }  
           for (let index = 39*a-18; index < 40*a-19; index++) { 
            this.table20.push(  {headerName:(userObject[0][index]).toString(),field:(index).toString(), width:230}   )          
           } 
           return this.table20  }


  columnDefs4=[
    {headerName:"Instances",field:'0',cellStyle: {
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },},
    //{headerName:this.getData(), field:this.getData()}
    {headerName:"Total power", children:this.getData20()},

    {headerName:"Leakage power", children:this.getData17()},
    {headerName:"Internal power", children:this.getData18()},
    {headerName:"Switching power", children:this.getData19()},

  ]
//t=[]
t: number[] = [];
//t =[field]
calculDiff(){
  this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          const userObject = JSON.parse(this.object)
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)

          for (let j = 1; j <a; j++) { 

            for (let i = 0; i < userObject.length; i++) { 
      
            this.t.push(  (userObject[i][j]-userObject[i][j+1]) )          
           } } 
          
          
          return(this.t)
}
  

  // getRowData() {
  //  let rowData = Array();
  //   this.gridApi.forEachNode(node => rowData.push(node.data));
  //   //console.log(rowData)
  //   const a = rowData.map(row => row=[{ m: 'Design total' },
  //   { m: 'Design switching' },
  //   { m: 'Design leakage' },
  //   { m: 'Design intenal' },
  //   { m: 'Combinational total' },
  //   { m: 'Combinational switching' },
  //   { m: 'Combinational leakage' },
  //   { m: 'Combinational intenal' },
  //   { m: 'Register total' },
  //   { m: 'Register switching' },
  //   { m: 'Register leakage' },
  //   { m: 'Register intenal' },
  //   { m: 'Memory total' },
  //   { m: 'Memory switching' },
  //   { m: 'Memory leakage' },
  //   { m: 'Memory intenal' }]);
  //   //console.log(a);
  // }
  
 
//    onGridReady1=(params)=>{this.uploadFilesComponent.getAllProjectsFromAPI().subscribe(data => { 
//     JSON.stringify(data);
//    params.api.applyTransaction({add:data})
//    console.log(data)

//  });
//      }
  

  //onGridReady1=(params)=>{
    //this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    //const userObject = JSON.parse(this.object);

    //console.log(this.object)
    //params.api.setRowData(this.object)    }

  
  // onGridReady1=(params)=>{
  //   fetch('http://localhost:8080/importCSV/path?pathh=').then(resp=>resp.json())
  //   .then(resp=>{console.log(resp)
  //     params.api.applyTransaction({add:resp})})
      

  // }



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
    enableCharts:true,
    suppressDragLeaveHideesColumns:true,
    suppressRowClickSelection: true,
    enableRangeSelection:true,
    animateRows:true,
    columnDefs:this.columnDefs,
    groupHidenOpenParents:true,
    columnDefs1:this.columnDefs1,

    //rowData: this.rowData



    
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
//let $scope = userObject;
//let index = $scope.userObject.findIndex( a => a.userObject.contains("Design_Leakage_Power") );



function abValueGetter(params) {
  
  return ((params.data.undefined_Design_Total_Power - params.data.undefined_Design_Total_Power)/params.data.undefined_Design_Total_Power)*100 +"%";
}
// function dsf(params: ValueGetterParams){

//   return ("0");
// }


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

  

  

