import { HttpClient, HttpParams } from '@angular/common/http';
import { STRING_TYPE } from '@angular/compiler';
import { newArray } from '@angular/compiler/src/util';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AgChart } from 'ag-charts-community';
import { Grid } from 'ag-grid';
import { AgGridAngular } from 'ag-grid-angular';
import { CellClickedEvent, ColumnApi, GridApi, RowNode } from 'ag-grid-community';
import { ColDef, GridReadyEvent, ValueGetterParams } from 'ag-grid-community';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
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
     object3=""
     object4=""
     object5=""

     userObject
     a:number
     constructor(private http:HttpClient,private router:Router,private dataService: DataService){ 
      //  this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      //  let userObject = JSON.parse(this.object)
      //   this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      //   const a = JSON.parse(this.object2)
        // this.dataService.sharedParam5.subscribe(param=>this.object5=JSON.stringify(param));
        // const bb = JSON.parse(this.object5)
        // console.log(bb)
     }

  title = 'PowerPro';
  gridApi:GridApi;
  gridApi1:GridApi;

  gridColumnApi:ColumnApi;
  gridColumnApi1:ColumnApi;

  dataa=this.getAllDataa()
  dataSources=this.getAllDataaSources()

  tableee: Array<{headerName: string,width:number,cellStyle:object,field,type: string}>=[]


  tablee: Array<{field: string, type: string,headerName: string,width:number,cellStyle:object}>=[]

table: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table2: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table3: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table4: Array<{field: string, valueGetter,  type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table5: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table6: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table7: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table8: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table9: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table10: Array<{field: string, valueGetter,type: string, headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table11: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table12: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table13: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table14: Array<{field: string, valueGetter,type: string, headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table15: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table16: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table17: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table18: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table19: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
table20: Array<{field: string, valueGetter, type: string,headerName: string,width:number,cellStyle:object,editable:boolean}>=[]
topRow=[]

  searchValue;

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
  ];
   rowData2: string[]=[];
   header:string[]=[];
   diff:string[]=[];
   diff1:string[]=[];
   rmse:string[]=[];
   avg:string[]=[];


   calculStd(){
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    console.log(userObject)
     this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
     const a = JSON.parse(this.object2)
  
     for(let j=0;j<a-1;j++){
      for(let i=0;i<userObject[0].length-1;i+=2*a-1){
  
     for(let index=1;index<userObject.length;index++){
  
        this.diff.push(
         ( userObject[index][a+1+i+j])
        )
     }
    }
    }
    return this.diff
  }
  calculStd1(){

    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    this.diff1.length=0
    var v;
    var mean 
    var total1 = 0;
    var v1;
    var temp23;
    var square;
    for(let j=0;j<this.diff.length;j+=userObject.length-1){
      var total = 0;
      var total1 = 0;

    for(let i=0;i<userObject.length-1;i++){

  
      v = parseFloat(this.diff[i+j]);
      if(v === NaN) continue

      total += v;
      mean = total / (userObject.length-1);
  
      v1 = Math.pow((parseFloat(this.diff[i+j])-mean),2);}
      total1 += v1;
      temp23 = total1 / (userObject.length-1);
    square = Math.sqrt(temp23).toFixed(2)
      this.diff1.push(
        square
      )
   
  
  }
    return this.diff1
  }

  calculRmse(){
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    const userObject = JSON.parse(this.object)
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
     const a = JSON.parse(this.object2)
    this.rmse.length=0
    var k;
    var b;
    var c;
    for(let l=0;l<a-1;l++){
    for(let j=1;j<userObject[0].length-1;j+=2*a-1){
      var tot=0;

    for(let i=1;i<userObject.length;i++){

k=Math.pow((parseFloat(userObject[i][j])-parseFloat(userObject[i][j+1+l])),2)
tot+=k}
b=tot/(userObject.length-1)
c=Math.sqrt(b).toFixed(2)

this.rmse.push(
  c
)
    }}
    return this.rmse
  }


  calculAvg(){
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)
    for(let j=1;j<a;j++){
      var k=0;

for(let i=0;i<20;i++){
  k=(((parseFloat(this.rowData2[i])-parseFloat(this.rowData2[i+20*j]))/parseFloat(this.rowData2[i]))*100)
this.avg.push(
k.toFixed(2)
)
  }}
  return this.avg
}


// getUserObject(){
  
//   //this.dataService.changeParam5(userObjec)

//    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
//   let userObject = JSON.parse(this.object)
// //let userObject1=userObject
// return  userObject
// }

   getH(){
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)
    this.dataService.sharedParam3.subscribe(param=>this.object3=JSON.stringify(param));
    const name = JSON.parse(this.object3)
    this.dataService.sharedParam4.subscribe(param=>this.object4=JSON.stringify(param));
    const ref = JSON.parse(this.object4)
    for(let i=0;i<a;i++){
      this.header.push(
        name[i])
    }
    return this.header
   }

 getNodes(){

   this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
  let userObject = JSON.parse(this.object)
  
  let userObject12 = userObject.slice(1,2)
  
  
  
   this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
   const a = JSON.parse(this.object2)
   for (let i = 0; i <a; i++) { 

   for (let index = 1+i; index <userObject[0].length; index+=a+(a-1)) { 
     
     this.rowData2.push(              
userObject12[0][index].toString())

}  }
   return this.rowData2
}


rowData: Array<{0:string, 1:string,2: string,3:string,4:string,5:string,11:string,6:string,7:string,8:string,9:string,10:string,12:string,13:string,14:string,15:string,16:string,17:string,18:string,19:string,20:string,21:string,22:string,23:string,24:string,25:string,26:string,27:string,28:string,29:string,30:string,31:string,32:string,33:string,34:string,35:string,36:string,37:string,38:string,39:string,40:string,41:string}>=[]

  getColumns(){
    this.getNodes()

     this.calculStd()

     this.calculStd1()
     this.calculRmse()
     this.calculAvg()
     for (let i = 0; i <this.rowData1.length; i++) { 
       this.rowData.push(              
  {0:this.rowData1[i],1:'',2:this.rowData2[i],3:this.rowData2[this.rowData1.length+i],4:this.rowData2[2*this.rowData1.length+i],5:this.rowData2[3*this.rowData1.length+i],6:this.rowData2[4*this.rowData1.length+i],7:this.rowData2[5*this.rowData1.length+i],8:this.rowData2[6*this.rowData1.length+i],9:this.rowData2[7*this.rowData1.length+i],10:this.rowData2[8*this.rowData1.length+i],11:this.rowData2[9*this.rowData1.length+i]
  ,12:this.rmse[i],13:this.rmse[this.rowData1.length+i],14:this.rmse[2*this.rowData1.length+i],15:this.rmse[3*this.rowData1.length+i],16:this.rmse[4*this.rowData1.length+i],17:this.rmse[5*this.rowData1.length+i],18:this.rmse[6*this.rowData1.length+i],19:this.rmse[7*this.rowData1.length+i],20:this.rmse[8*this.rowData1.length+i],21:this.rmse[9*this.rowData1.length+i]
  ,22:this.diff1[i],23:this.diff1[this.rowData1.length+i],24:this.diff1[2*this.rowData1.length+i],25:this.diff1[3*this.rowData1.length+i],26:this.diff1[4*this.rowData1.length+i],27:this.diff1[5*this.rowData1.length+i],28:this.diff1[6*this.rowData1.length+i],29:this.diff1[7*this.rowData1.length+i],30:this.diff1[8*this.rowData1.length+i],31:this.diff1[9*this.rowData1.length+i]
  ,32:this.avg[i],33:this.avg[this.rowData1.length+i],34:this.avg[2*this.rowData1.length+i],35:this.avg[3*this.rowData1.length+i],36:this.avg[4*this.rowData1.length+i],37:this.avg[5*this.rowData1.length+i],38:this.avg[6*this.rowData1.length+i],39:this.avg[7*this.rowData1.length+i],40:this.avg[8*this.rowData1.length+i],41:this.avg[9*this.rowData1.length+i]})

}  

     return this.rowData
  }
 

   getData(){   
 
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)
   

    this.getH()
    this.getColumns()
    for (let index = 2; index <= a+1; index++) { 
       this.tablee.push(              

  {
   field: index.toString(),headerName:(this.header[index-2]) , type: 'rightAligned', width:100,
   cellStyle: {
     fontWeight: 'bold',
 }
}  ,)} 
     
     return this.tablee  }


 

 getHeaders() {
  this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)
    
    console.log(this.rowData)
  console.log(this.diff)
  console.log(this.diff1)
  console.log(this.rmse)
  console.log(this.rowData2)
  console.log(this.avg)

  for(let i=1;i<a;i++){
    this.tableee.push(
      
       
        {headerName:"AVG" + " ("+this.header[i].toString()+")",field:(31+i).toString()
        
        // function (params) {
        //   return( ((parseFloat(params.getValue(2)) - parseFloat(params.getValue(2+i)))/parseFloat(params.getValue(2)))*100).toFixed(2)
        // }
        ,cellStyle: {
          backgroundColor: 'AliceBlue', 
          fontWeight: 'bold'  
      }, type: 'rightAligned',
       width:100,},
        {headerName:"STD_DEV" + " ("+this.header[i].toString()+")",field:(21+i).toString()
        
        
         ,cellStyle: {
          fontWeight: 'bold' 
      }, type: 'rightAligned',
       width:100,},
        {headerName:"RMSE" + " ("+this.header[i].toString()+")",field:(11+i).toString()
       
        , cellStyle: {
          backgroundColor: 'AliceBlue', 
          fontWeight: 'bold' 
      }, type: 'rightAligned',
       width:100,},    
     )            
  }
return this.tableee
 }



  colu=[
    {
      headerName:"COMPONENTS",
      Width:100,
      
     field:'0',
     cellStyle: {
      backgroundColor: 'AliceBlue', 
      fontWeight: 'bold' 
  },
  sortable: false,
  editable: false,
    },
    {
      headerName:"POWER NUMBERS",
      children:this.getData(),

    },
  {headerName:'CSVs vs GATE',children:this.getHeaders()}
    
];


  UploadFilesComponent: UploadFilesComponent;  


  ngOnInit(){ }
;


onSelectionChanged() {
  var selectedRows = this.gridApi.getSelectedRows();
  var selectedRows1 = this.gridApi1.getSelectedRows();
  console.log(selectedRows);
  console.log(selectedRows1);
}
 

   

  getData1(){   
     //this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
   // const userObject = JSON.parse(this.object)
    this.table=[]
    const a=this.a

    //this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    //const a = JSON.parse(this.object2)
    this.updateEvenRowData

    console.log(a)
    for (let index = 1; index <= this.a; index++) { 
       this.table.push(              
  {
   field: index.toString(), headerName:(this.userObject[0][index]).toString() , type: 'rightAligned', width:100,
   cellStyle: {
     fontWeight: 'bold',
 },editable:true,
 valueGetter:function diff(params){
  return params.data[index]
}
}  ,)} 

  for (let index = this.a+1; index <2*this.a; index++) { 
    this.table.push(  {headerName:(this.userObject[0][index]).toString(), type: 'rightAligned' , field:index.toString(), width:150,
    cellStyle: {
      color: 'blue', 
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },editable:false,
   valueGetter: function diff(params){
        
    let refValue=parseFloat(params.data[1])      
    let comp=parseFloat(params.data[index-a+1])
    let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
    
    return diff
  
} 
  }   )          
   }
     
     return this.table  }

     getData2(){   
      // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      // const userObject = JSON.parse(this.object)
      this.table2=[]
      const a=this.a

     // this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      //const a = JSON.parse(this.object2)
  
     
      for (let index = 2*this.a; index < 3*this.a; index++) {   
      this.table2.push(              
      
     {field:index.toString(),editable:true,headerName:(this.userObject[0][index]).toString(), type: 'rightAligned', width:100, cellStyle: {
      backgroundColor: '', 
      
       fontWeight: 'bold' 
   }, valueGetter:function diff(params){
    return params.data[index]
  }
  }  
   
      )   
      
       } 
       for (let index = 3*this.a; index <4*this.a-1; index++) { 
        this.table2.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
          backgroundColor: 'AliceBlue', 
          color: 'blue', 

           fontWeight: 'bold' 
       }, valueGetter: function diff(params){
        
        let refValue=parseFloat(params.data[2*a])
        let comp=parseFloat(params.data[index-a+1])
        let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
        return diff
      
    } 
      } )
          
       } 
       return this.table2  }

       getData3(){   
       //  this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
        // const userObject = JSON.parse(this.object)
         this.table3=[]
         const a=this.a

       // this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
       // const a = JSON.parse(this.object2)
    
        for (let index = 4*this.a-1; index < 5*this.a-1; index++) {   
        this.table3.push(              
        
    
       {field:index.toString(),editable:true,headerName:(this.userObject[0][index]).toString(), type: 'rightAligned', width:100, cellStyle: {
        backgroundColor: '', 
         fontWeight: 'bold' 
     },valueGetter:function diff(params){
      return params.data[index]
    }}      
   
        )   
        
         } 
         for (let index = 5*this.a-1; index < 6*this.a-2; index++) { 
          this.table3.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
            backgroundColor: 'AliceBlue', 
            color: 'blue', 

             fontWeight: 'bold' 
         },valueGetter: function diff(params){
        
          let refValue=parseFloat(params.data[4*a-1])
          let comp=parseFloat(params.data[index-a+1])
          let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
          return diff
        
      } }   )          
         } 
         return this.table3  }

         getData4(){   
          this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))

    this.userObject = JSON.parse(this.object)


    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
   // const a = JSON.parse(this.object2)
   this.a = JSON.parse(this.object2)
    const a=this.a
    
          // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          // const userObject = JSON.parse(this.object)
          this.table4=[]


      
          for (let index = 6*this.a-2; index < 7*this.a-2; index++) {   
          this.table4.push(              
          
         {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
          backgroundColor: '', 
           fontWeight: 'bold' 
       },valueGetter:function diff(params){
        return params.data[index]
      }}           
          )   
          
           }  
           for (let index = 7*this.a-2; index < 8*this.a-3; index++) { 
            this.table4.push(  {headerName:(this.userObject[0][index]).toString(),editable:false,field:(index).toString() ,type: 'rightAligned', width:150, cellStyle: {
              backgroundColor: 'AliceBlue', 
              color: 'blue', 

               fontWeight: 'bold' 
           },valueGetter:function diff(params){
        
            let refValue=parseFloat(params.data[6*a-2])
            let comp=parseFloat(params.data[index-a+1])
            let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
    
            return diff
          }}   )          
           } 
           return this.table4  }


  columnDefs=[
    {headerName:"INSTANCES",field:'0',width:250, cellStyle: {
       backgroundColor: 'AliceBlue', 
        fontWeight: 'bold' 
    },},
    {headerName:"Total power", children:this.getData4()},
    {headerName:"Leakage power",children:this.getData1()},
    {headerName:"Internal power", children:this.getData2()},
    {headerName:"Switching power", children:this.getData3()},
   ];

  

   getData5(){   
    // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
     //const userObject = JSON.parse(this.object)
     this.table5=[]
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

 
    for (let index = 8*a-3; index < 9*a-3; index++) {    
    this.table5.push(              
  {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
    backgroundColor: '', 
    
     fontWeight: 'bold' 
 },    valueGetter: function diff(params){
  return params.data[index]
}
}    
    )   
    
     }  
     for (let index = 9*a-3; index < 10*a-4; index++) { 
      this.table5.push(  {headerName:(this.userObject[0][index]).toString(),editable:false,field:(index).toString(), type: 'rightAligned', width:150, cellStyle: {
        backgroundColor: 'AliceBlue', 
        color: 'blue', 

         fontWeight: 'bold' 
     },    valueGetter: function diff(params){
          
      let refValue=parseFloat(params.data[8*a-3])
      let comp=parseFloat(params.data[index-a+1])
      let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
      return diff
    
  }
    }   )          
     } 
     return this.table5  }

     getData6(){   
      // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      // const userObject = JSON.parse(this.object)
       this.table6=[]
      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      for (let index = 10*a-4; index < 11*a-4; index++) {   
      this.table6.push(              
      
     {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
      backgroundColor: '', 
       fontWeight: 'bold' 
   },    valueGetter: function diff(params){
    return params.data[index]
  }
  }  
     
      )   
      
       }  
       for (let index = 11*a-4; index < 12*a-5; index++) {
        this.table6.push(  {headerName:(this.userObject[0][index]).toString(),editable:false,field:(index).toString(), type: 'rightAligned', width:150, cellStyle: {
          backgroundColor: 'AliceBlue', 
          color: 'blue', 

           fontWeight: 'bold' 
       },    valueGetter: function diff(params){
          
        let refValue=parseFloat(params.data[10*a-4])
        let comp=parseFloat(params.data[index-a+1])
        let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
        return diff
      
    }
      }   )          
       } 
       return this.table6  }

       getData7(){   
        // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
       //  const userObject = JSON.parse(this.object)
         this.table7=[]
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
  
        for (let index = 12*a-5; index < 13*a-5; index++) {   
        this.table7.push(              
       {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
        backgroundColor: '', 
         fontWeight: 'bold' 
     },    valueGetter: function diff(params){
      return params.data[index]
    }
    }              )   
        
         }  
         for (let index = 13*a-5; index < 14*a-6; index++) { 
          this.table7.push(  {headerName:(this.userObject[0][index]).toString(),editable:false,field:(index).toString(), type: 'rightAligned', width:150, cellStyle: {
            backgroundColor: 'AliceBlue', 
            color: 'blue', 
 
             fontWeight: 'bold' 
         },    valueGetter: function diff(params){
          
          let refValue=parseFloat(params.data[12*a-5])
          let comp=parseFloat(params.data[index-a+1])
          let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
          return diff
        
      }
        }   )          
         } 
         return this.table7  }

         getData8(){   
         //  this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          // const userObject = JSON.parse(this.object)
           this.table8=[]
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          
          for (let index = 14*a-6; index < 15*a-6; index++) {   
          this.table8.push(              
         {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
          backgroundColor: '', 
           fontWeight: 'bold' 
       },    valueGetter: function diff(params){
        return params.data[index]
      }
      }                
          )   
          
           }  
           for (let index = 15*a-6; index < 16*a-7; index++) { 
            this.table8.push(  {headerName:(this.userObject[0][index]).toString(),editable:false,field:(index).toString(), type: 'rightAligned', width:150, cellStyle: {
              backgroundColor: 'AliceBlue', 
              color: 'blue', 

               fontWeight: 'bold' 
           },    valueGetter: function diff(params){
          
            let refValue=parseFloat(params.data[14*a-6])
            let comp=parseFloat(params.data[index-a+1])
            let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
            return diff
          
        },
          }   )          
           } 
           return this.table8  }


  columnDefs1=[
    {headerName:"INSTANCES",field:'0',cellStyle: {
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },},
    {headerName:"Total power", children:this.getData8()},
    {headerName:"Leakage power" ,children:this.getData5()},
    {headerName:"Internal power", children:this.getData6()},
    {headerName:"Switching power", children:this.getData7()},

  ]



  getData9(){   
    // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    // const userObject = JSON.parse(this.object)
     this.table9=[]
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

    for (let index = 16*a-7; index < 17*a-7; index++) {    
    this.table9.push(              

  {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
    backgroundColor: '', 
     fontWeight: 'bold' 
 },    valueGetter: function diff(params){
  return params.data[index]
}
}    

    )   
    
     }   
     for (let index = 17*a-7; index < 18*a-8; index++) { 
      this.table9.push(  {headerName:(this.userObject[0][index]).toString(),editable:false,field:(index).toString(), type: 'rightAligned', width:150, cellStyle: {
        backgroundColor: 'AliceBlue', 
        color: 'blue', 

         fontWeight: 'bold' 
     },    valueGetter: function diff(params){
        
      let refValue=parseFloat(params.data[16*a-7])
      let comp=parseFloat(params.data[index-a+1])
      let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))

      return diff
    }
    }   )          
     } 
     return this.table9  }

     getData10(){   
      // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      // const userObject = JSON.parse(this.object)
       this.table10=[]

      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      for (let index = 18*a-8; index <= 19*a-8; index++) {   
      this.table10.push(              
      
   
     {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
      backgroundColor: '', 

       fontWeight: 'bold' 
   },    valueGetter: function diff(params){
    return params.data[index]
  }
  }        

      )   
      
       }  
       for (let index = 19*a-8; index < 20*a-9; index++) { 
        this.table10.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
          backgroundColor: 'AliceBlue', 
          color: 'blue', 

           fontWeight: 'bold' 
       },    valueGetter: function diff(params){
        
        let refValue=parseFloat(params.data[18*a-8])
        let comp=parseFloat(params.data[index-a+1])
        let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
  
        return diff
      }
      }   )          
       } 
       return this.table10  }

       getData11(){   
       //  this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
       //  const userObject = JSON.parse(this.object)
         this.table11=[]

        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
    
        for (let index = 20*a-9; index < 21*a-9; index++) {   
        this.table11.push(              
    
       {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
        backgroundColor: '', 
        
         fontWeight: 'bold' 
     },    valueGetter: function diff(params){
      return params.data[index]
    }
    }      
        
 
        )   
        
         }  
         for (let index = 21*a-9; index < 22*a-10; index++) { 
          this.table11.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
            backgroundColor: 'AliceBlue', 
            color: 'blue', 

             fontWeight: 'bold' 
         },    valueGetter: function diff(params){
        
          let refValue=parseFloat(params.data[20*a-9])
          let comp=parseFloat(params.data[index-a+1])
          let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
    
          return diff
        }
        }   )          
         } 
         return this.table11  }

         getData12(){   
         //  this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          // const userObject = JSON.parse(this.object)
           this.table12=[]
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          for (let index = 22*a-10; index < 23*a-10; index++) {   
          this.table12.push(              
          
     
         {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
          backgroundColor: '', 
           fontWeight: 'bold' 
       },    valueGetter: function diff(params){
        return params.data[index]
      }
      }     
 
          )   
          
           }   
           for (let index = 23*a-10; index < 24*a-11; index++) { 
            this.table12.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
              backgroundColor: 'AliceBlue', 
              color: 'blue', 
 
               fontWeight: 'bold' 
           },    valueGetter: function diff(params){
        
            let refValue=parseFloat(params.data[22*a-10])
            let comp=parseFloat(params.data[index-a+1])
            let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
      
            return diff
          }
          }   )          
           } 
           return this.table12 }


  columnDefs2=[
    {headerName:"INSTANCES",field:'0',cellStyle: {
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },},
    {headerName:"Total power", children:this.getData12()},
    {headerName:"Leakage power", children:this.getData9()},
    {headerName:"Internal power", children:this.getData10()},
    {headerName:"Switching power", children:this.getData11()},

  ]



  getData13(){   
     //this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    // const userObject = JSON.parse(this.object)
     this.table13=[]
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

  
    for (let index = 24*a-11; index < 25*a-11; index++) {    
    this.table13.push(              
 
  {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
    backgroundColor: '', 
     fontWeight: 'bold' 
 },    valueGetter: function diff(params){
  return params.data[index]
}
}    
    
  
    )   
    
     } 
     for (let index = 25*a-11; index < 26*a-12; index++) { 
      this.table13.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
        backgroundColor: 'AliceBlue', 
        color: 'blue', 

         fontWeight: 'bold' 
     },    valueGetter:  function diff(params){
        
      let refValue=parseFloat(params.data[24*a-11])
      let comp=parseFloat(params.data[index-a+1])
      let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))

      return diff
    }
    }   )          
     } 
     return this.table13  }

     getData14(){   
      // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      // const userObject = JSON.parse(this.object)
       this.table14=[]
      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      for (let index = 26*a-12; index < 27*a-12; index++) {   
      this.table14.push(              
      
   
     {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
      backgroundColor: '', 
       fontWeight: 'bold' 
   },    valueGetter: function diff(params){
    return params.data[index]
  }
  }  
     
      )   
      
       }   
       for (let index = 27*a-12; index < 28*a-13; index++) { 
        this.table14.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
          backgroundColor: 'AliceBlue', 
          color: 'blue', 
 
           fontWeight: 'bold' 
       },    valueGetter: function diff(params){
        
        let refValue=parseFloat(params.data[26*a-12])
        let comp=parseFloat(params.data[index-a+1])
        let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
  
        return diff
      }
      }   )          
       } 
       return this.table14  }

       getData15(){   
       // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
       //  const userObject = JSON.parse(this.object)
         this.table15=[]
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
    
        for (let index = 28*a-13; index <29*a-13; index++) {   
        this.table15.push(              
    
       {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
        backgroundColor: '', 
         fontWeight: 'bold' 
     },    valueGetter: function diff(params){
      return params.data[index]
    }
    }      
   
        )   
        
         }   
         for (let index = 29*a-13; index < 30*a-14; index++) { 
          this.table15.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
            backgroundColor: 'AliceBlue', 
            color: 'blue', 

             fontWeight: 'bold' 
         },    valueGetter: function diff(params){
        
          let refValue=parseFloat(params.data[29*a-13])
          let comp=parseFloat(params.data[index-a+1])
          let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
    
          return diff
        }
        }   )          
         } 
         return this.table15  }

         getData16(){   
          // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
         //  const userObject = JSON.parse(this.object)
           this.table16=[]
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          for (let index = 30*a-14; index < 31*a-14; index++) {   
          this.table16.push(              
         {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
          backgroundColor: '', 
           fontWeight: 'bold' 
       },    valueGetter: function diff(params){
        return params.data[index]
      }
      }     
          

          )   
          
           }  
           for (let index = 31*a-14; index < 32*a-15; index++) { 
            this.table16.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
              backgroundColor: 'AliceBlue', 
              color: 'blue', 
               fontWeight: 'bold' 
           },    valueGetter: function diff(params){
        
            let refValue=parseFloat(params.data[30*a-14])
            let comp=parseFloat(params.data[index-a+1])
            let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
      
            return diff
          }
          }   )          
           } 
           return this.table16  }


  columnDefs3=[
    {headerName:"INSTANCES",field:'0',cellStyle: {
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },},
    {headerName:"Total power", children:this.getData16()},
    {headerName:"Leakage power", children:this.getData13()},
    {headerName:"Internal power", children:this.getData14()},
    {headerName:"Switching power", children:this.getData15()},

  ]



  getData17(){   
    // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    // const userObject = JSON.parse(this.object)
     this.table17=[]
    this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
    const a = JSON.parse(this.object2)

    for (let index = 32*a-15; index <33*a-15; index++) {    
    this.table17.push(              
 
  {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
    backgroundColor: '', 
     fontWeight: 'bold' 
 },    valueGetter: function diff(params){
  return params.data[index]
}
}       
 
    )   
    
     }  
     for (let index = 33*a-15; index < 34*a-16; index++) { 
      this.table17.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
        backgroundColor: 'AliceBlue', 
        color: 'blue', 
         fontWeight: 'bold' 
     },    valueGetter: function diff(params){
        
      let refValue=parseFloat(params.data[32*a-15])
      let comp=parseFloat(params.data[index-a+1])
      let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))

      return diff
    }
    }   )          
     } 
     return this.table17  }

     getData18(){   
      // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
     //  const userObject = JSON.parse(this.object)
       this.table18=[]
      this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
      const a = JSON.parse(this.object2)
  
      for (let index = 34*a-16; index <35*a-16; index++) {   
      this.table18.push(              
   
     {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
      backgroundColor: '', 
       fontWeight: 'bold' 
   },    valueGetter: function diff(params){
    return params.data[index]
  }
  }  
     
      )   
      
       }  
       for (let index = 35*a-16; index < 36*a-17; index++) { 
        this.table18.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
          backgroundColor: 'AliceBlue', 
          color: 'blue', 
           fontWeight: 'bold' 
       },    valueGetter: function diff(params){
        
        let refValue=parseFloat(params.data[34*a-16])
        let comp=parseFloat(params.data[index-a+1])
        let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
  
        return diff
      }
      }   )          
       } 
       return this.table18  }

       getData19(){   
       //  this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
       //  const userObject = JSON.parse(this.object)
         this.table19=[]
        this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
        const a = JSON.parse(this.object2)
    
        for (let index =  36*a-17; index <  37*a-17; index++) {   
        this.table19.push(              
    
       {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
        backgroundColor: '', 
         fontWeight: 'bold' 
     },    valueGetter: function diff(params){
      return params.data[index]
    }
    }              
   
        )   
        
         }  
         for (let index = 37*a-17; index < 38*a-18; index++) { 
          this.table19.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
            backgroundColor: 'AliceBlue', 
            color: 'blue',  
             fontWeight: 'bold' 
         },    valueGetter: function diff(params){
        
          let refValue=parseFloat(params.data[36*a-17])
          let comp=parseFloat(params.data[index-a+1])
          let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
    
          return diff
        }
        }   )          
         } 
         return this.table19  }

         getData20(){   
          // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
          // const userObject = JSON.parse(this.object)
           this.table20=[]
          this.dataService.sharedParam2.subscribe(param=>this.object2=JSON.stringify(param));
          const a = JSON.parse(this.object2)
      
          for (let index = 38*a-18; index < 39*a-18; index++) {   
          this.table20.push(              
          
      
         {field:index.toString(),headerName:(this.userObject[0][index]).toString(),editable:true, type: 'rightAligned', width:100, cellStyle: {
          backgroundColor: '', 
           fontWeight: 'bold' 
       },    valueGetter: function diff(params){
        return params.data[index]
      }
      }     
          )   
          
           }  
           for (let index = 39*a-18; index < 40*a-19; index++) { 
            this.table20.push(  {headerName:(this.userObject[0][index]).toString(),editable:false, type: 'rightAligned',field:(index).toString(), width:150, cellStyle: {
              backgroundColor: 'AliceBlue', 
              textAlign: 'center',
              color: 'blue',  
               fontWeight: 'bold' 
           },    valueGetter: function diff(params){
        
            let refValue=parseFloat(params.data[38*a-18])
            let comp=parseFloat(params.data[index-a+1])
            let diff=parseFloat((100*(refValue-comp)/refValue).toFixed(2))
    
            return diff
          }
          }   )          
           } 
           return this.table20  }


  columnDefs4=[
    {headerName:"INSTANCES",field:'0',cellStyle: {
      backgroundColor: 'AliceBlue', 
       fontWeight: 'bold' 
   },},
    {headerName:"Total power", children:this.getData20()},
    {headerName:"Leakage power", children:this.getData17()},
    {headerName:"Internal power", children:this.getData18()},
    {headerName:"Switching power", children:this.getData19()},

  ]


  
  // Fusion charts data 
  getDataS(i){
    //this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
    //const userObject = JSON.parse(this.object)
    let dataS=[
      {
      "x": 30,
      "y": 0,
      "z": 100,
      "name": 'name'
      },
      
    ]
    
    let fields:number[]=[]
    let da
    let len=2*this.a-1// 2=>3 3=>5 4=>7    
    switch (i) {
        case 1:
            da=this.getData4()
            break;
        case 2:
          da=this.getData1()
          break
        case 3:
            da=this.getData2()
            
            break
        case 4:
            da=this.getData3()
            break
        case 5:
            da=this.getData8()
            break
        case 6:
        da=this.getData5()
          break
        case 7:
        da=this.getData6()
          break
        case 8:
        da=this.getData7()
          break
        case 9:
        da=this.getData12()
          break
        case 10:
        da=this.getData9()
          break
        case 11:
        da=this.getData10()
          break
        case 12:
        da=this.getData11()
          break
        case 13:
        da=this.getData16()
          break
        case 14:
        da=this.getData13()
          break
        case 15:
        da=this.getData14()
          break
        case 16:
        da=this.getData15()
          break
        case 17:
        da=this.getData20()
          break
        case 18:
        da=this.getData17()
          break
        case 19:
        da=this.getData18()
          break
        case 20:
        da=this.getData19()
          break

        default:
        break;
    }
    for(let i=0;i<len;i++){
      fields.push(Number(da[i].field))
    }
    let flag=true
    for(let l=0;l<this.a-1;l++){
      for (let index = 1; index < this.userObject.length; index++) {
      
        dataS.push(
          {
            "x":(index)*10,
            "y": Number(this.userObject[index][fields[1+l+(this.a-1)]]),           //2,{3,4},{4,5,6},{5,6,7,8},14 3i-1 diff %
            "z": Number(this.userObject[index][fields[1+l]]),//1,{1,2},{1,2,3},{1,2,3,4},13 3i-2 bubble taille (this.a-1)
            "name": this.userObject[index][0]
          }
          
          )
          if(flag===true){
            let a=dataS[1]
            dataS.length=0
            dataS.push(a)
            flag=false
          }
      }
      
    }
    let dataaS=[{"seriesname":'data0',"data":dataS.slice(0,this.userObject.length-1)}]    
    for(let n=1;n<this.a-1;n++){      
      dataaS.push({"seriesname":'data'+n,"data":dataS.slice(n*(this.userObject.length-1),(n+1)*(this.userObject.length-1))})      
    }
    return dataaS
  }
  //first chart 
  getAllDataa(){
    let dataa=[this.getDataS(1)]
    dataa=[]
    for(let i=1;i<=20;i++){
      dataa.push(this.getDataS(i))
    }    
    return dataa
  }
  getAllDataaSources(){
    let dataSources=[this.dataSource1]
    dataSources=[]
    dataSources.push(this.dataSource1)   
    dataSources.push(this.dataSource2)   
    dataSources.push(this.dataSource3)   
    dataSources.push(this.dataSource4)   
    return dataSources

  }
  dataSource1={
    "chart": { 
        "caption": "Design Total Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[0],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[0],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[0],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Design Total Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[0],
    "trendlines": [
        {
            "line": [
                {
                    "startValue":1.1*getMin(this.dataa[0],'y') ,
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[0],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }   
  //second chart
  dataSource2={
    "chart": {
        "caption": "Design Leakage Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[1],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[1],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[1],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Design Leakage Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[1],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[1],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[1],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //third chart
  dataSource3={
    "chart": {
        "caption": "Design Internal Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[2],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[2],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[2],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Design Internal Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[2],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[2],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[2],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //4th chart------------------------------------------------------------------
  dataSource4={
    "chart": {
        "caption": "Design Switching Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[3],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[3],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[3],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Design Switching Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[3],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[3],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[3],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //5 chart------------------------------------------------------------------
  dataSource5={
    "chart": {
        "caption": " Combitional Total Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[4],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[4],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[4],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name :  Combitional Total Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[4],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[4],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[4],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //6 chart------------------------------------------------------------------
  dataSource6={
    "chart": {
        "caption": "Combinational  Leakage Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[5],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[5],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[5],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Combinational  Leakage Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[5],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[5],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[5],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //7 chart------------------------------------------------------------------
  dataSource7={
    "chart": {
        "caption": "Combinational Internal Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[6],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[6],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[6],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Combinational Interna Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[6],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[6],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[6],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //8 chart------------------------------------------------------------------
  dataSource8={
    "chart": {
        "caption": "Combinational Switching Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[7],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[7],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[7],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Combinational Switching Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[7],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[7],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[7],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //9 chart------------------------------------------------------------------
  dataSource9={
    "chart": {
        "caption": "Register Total Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[8],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[8],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[8],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Register Total Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[8],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[8],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[8],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //10 chart------------------------------------------------------------------
  dataSource10={
    "chart": {
        "caption": "Register Leakage Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[9],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[9],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[9],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Register Leakage Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[9],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[9],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[9],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //11 chart------------------------------------------------------------------
  dataSource11={
    "chart": {
        "caption": "Register Internal Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[10],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[10],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[10],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Register Internal Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[10],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[10],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[10],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //12 chart------------------------------------------------------------------
  dataSource12={
    "chart": {
        "caption": "Register Switching Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[11],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[11],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[11],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Register Switching Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[11],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[11],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[11],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //13 chart------------------------------------------------------------------
  dataSource13={
    "chart": {
        "caption": "Memory Total Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[12],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[12],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[12],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Memory Total Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[12],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[12],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[12],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //14 chart------------------------------------------------------------------
  dataSource14={
    "chart": {
        "caption": "Memory Leakage Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[13],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[13],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[13],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Memory Leakage Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[13],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[13],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[13],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //15 chart------------------------------------------------------------------
  dataSource15={
    "chart": {
        "caption": "Memory Internal Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[14],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[14],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[14],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Memory Internal Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[14],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[14],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[14],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //16 chart------------------------------------------------------------------
  dataSource16={
    "chart": {
        "caption": "Memory Switching Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[15],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[15],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[15],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : Memory Switching Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[15],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[15],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[15],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //17 chart------------------------------------------------------------------
  dataSource17={
    "chart": {
        "caption": "ClockNetwork Total Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[16],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[16],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[16],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : ClockNetwork Total Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[16],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[16],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[16],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //18 chart------------------------------------------------------------------
  dataSource18={
    "chart": {
        "caption": "ClockNetwork Leakage Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[17],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[17],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[17],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : ClockNetwork Leakage Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[17],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[17],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[17],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //19 chart------------------------------------------------------------------
  dataSource19={
    "chart": {
        "caption": "ClockNetwork Internal Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[18],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[18],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[18],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : ClockNetwork Internal Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[18],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[18],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[18],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }
  //20 chart------------------------------------------------------------------
  dataSource20={
    "chart": {
        "caption": "ClockNetwork Switching Power Diff%",
        "subcaption": "",
        "id":"myChartId",
        "xAxisMinValue": 0,
        "xAxisMaxValue": getMax(this.dataa[19],'x')+20,
        "yAxisMinValue": 1.1*getMin(this.dataa[19],'y'),
        "yAxisMaxValue": 1.1*getMax(this.dataa[19],'y'),
        "plotFillAlpha": "70",
        "plotFillHoverColor": "#6baa01",
        "xAxisName": "",
        "yAxisName": "Diff Percentage",
        "numDivlines": "0",
        "showValues": "0",
        "plotTooltext": "$name : ClockNetwork Switching Power $zvalue",
        "drawQuadrant": "1",
        "quadrantLineAlpha": "20",
        "quadrantLineThickness": "0",
        "quadrantXVal": "",
        "quadrantYVal": "0",
        "use3dlighting": "1",
        "showAlternateHGridColor": "0",
        "showAlternateVGridColor": "0",
        "theme": "fusion"
    },
     "dataset": this.dataa[19],
    "trendlines": [
        {
            "line": [
                {
                    "startValue": 1.1*getMin(this.dataa[19],'y'),
                    "endValue": "-20",
                    "isTrendZone": "1",
                    "color": "#aaaaaa",
                    "alpha": "25"
                },
                {
                  "startValue": "20",
                  "endValue": 1.1*getMax(this.dataa[19],'y'),
                  "isTrendZone": "1",
                  "color": "#aaaaaa",
                  "alpha": "25"
              },
                
            ]
        }
    ],
    
  }

  updateChart(f,eventValue,i,dataSource){
    let index=1
    let ii,ind
    while(index<=20){
      if(f<index*(2*this.a-1)){// a=2,f=10 -> index=4,ii=0 a=2,f=11 ->index=4,ii=1
        ii=f-(index-1)*(2*this.a-1)-2
        switch(index){
          case 4:ind=0;break
          case 1:ind=1;break
          case 2:ind=2;break
          case 3:ind=3;break
          case 8:ind=4;break
          case 5:ind=5;break
          case 6:ind=6;break
          case 7:ind=7;break
          case 12:ind=8;break
          case 9:ind=9;break
          case 10:ind=10;break
          case 11:ind=11;break
          case 16:ind=12;break
          case 13:ind=13;break
          case 14:ind=14;break
          case 15:ind=15;break
          case 20:ind=16;break
          case 17:ind=17;break
          case 18:ind=18;break
          case 19:ind=19;break

        }
        break
      }
      index++
    }
    if(ii==-1){
      //change oldRefOnRow change diff of each case
      
    }
    else{
      let oldCompOnRow=this.dataa[ind][ii].data[i]['z']      
      let oldDiffOnRow=this.dataa[ind][ii].data[i]['y']
      let oldRefOnRow=(100*oldCompOnRow)/(100-oldDiffOnRow)  
      console.log(oldCompOnRow);
      console.log(oldDiffOnRow);
      console.log(oldRefOnRow);
      console.log('ind');
      console.log(ind);
      
      console.log(getMin(this.dataa[ind],'y'));
      console.log(getMax(this.dataa[ind],'y'));
      
      /*
      diff=100(1-cmp/ref) => (100-diff)/100=cmp/ref=>100*cmp/(100-diff)
      */
      this.dataa[ind][ii].data[i]['z']=eventValue
      this.dataa[ind][ii].data[i]['y']=100*(1-(eventValue/oldRefOnRow))

      //travail du matin------------------------------------------------
      dataSource['chart']['yAxisMinValue']=1.1*getMin(this.dataa[ind],'y')
      dataSource['chart']['yAxisMaxValue']=1.1*getMax(this.dataa[ind],'y')
      dataSource['trendlines'][0]['line'][0]['startValue']=1.1*getMin(this.dataa[ind],'y')
      dataSource['trendlines'][0]['line'][1]['endValue']=1.1*getMax(this.dataa[ind],'y')
      console.log(this.dataa[ind][ii].data);
    }
    
  }
  

t: number[] = [];
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
  
  
gridOptions = {
    
  colmunsTypes:{
    editable:true,
    valueParser: function(para){
      return (para.newValue);
    },
  },
  filter:'agTextColumnFilter',
  filterParams: {
    buttons: ['reset', 'apply'],
    debounceMs: 200
  },
  defaultColDef:{
  resizable: true,
  sortable: true,
  wrapText: true,    
  autoHeight: true,
    
    enableRowGroup: true,
   
    editable:true,
  },
  rowGroupPanelShow:'always',
  enableCharts:true,
  suppressDragLeaveHideesColumns:true,
  suppressRowClickSelection: true,
  enableRangeSelection:true,
  animateRows:true,
  groupHidenOpenParents:true,
   

  onCellEditingStopped: (event:CellClickedEvent)=>  {
    let i=Number(event.rowIndex)
    let f=Number(event.colDef.field);
    let index=1
    console.log('field '+f+' '+i);
    while(index<=20){
      if(f<index*(2*this.a-1)){// a=2,f=10 -> index=4,ii=0 a=2,f=11 ->index=4,ii=1
        switch(index){
          case 4:this.updateChart(f,event.value,i,this.dataSource1);break
          case 1:this.updateChart(f,event.value,i,this.dataSource2);break
          case 2:this.updateChart(f,event.value,i,this.dataSource3);break
          case 3:this.updateChart(f,event.value,i,this.dataSource4);break
          case 8:this.updateChart(f,event.value,i,this.dataSource5);break
          case 5:this.updateChart(f,event.value,i,this.dataSource6);break
          case 6:this.updateChart(f,event.value,i,this.dataSource7);break
          case 7:this.updateChart(f,event.value,i,this.dataSource8);break
          case 12:this.updateChart(f,event.value,i,this.dataSource9);break
          case 9:this.updateChart(f,event.value,i,this.dataSource10);break
          case 10:this.updateChart(f,event.value,i,this.dataSource11);break
          case 11:this.updateChart(f,event.value,i,this.dataSource12);break
          case 16:this.updateChart(f,event.value,i,this.dataSource13);break
          case 13:this.updateChart(f,event.value,i,this.dataSource14);break
          case 14:this.updateChart(f,event.value,i,this.dataSource15);break
          case 15:this.updateChart(f,event.value,i,this.dataSource16);break
          case 20:this.updateChart(f,event.value,i,this.dataSource17);break
          case 17:this.updateChart(f,event.value,i,this.dataSource18);break
          case 18:this.updateChart(f,event.value,i,this.dataSource19);break
          case 19:this.updateChart(f,event.value,i,this.dataSource20);break

        }
        break
      }
      index++
    }
 },
  //   let i=Number(event.rowIndex)+1
  //   let f=Number(event.colDef.field);
  //   let newvalue=Number(event.value)
  //   console.log(this.arr);
    
  //   console.log(f);
  //   console.log(i);
  //   this.arr[i][f]=newvalue
   
  //  this.dataService.changeParam(this.arr)
  // this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param));
  //     let newarr = JSON.parse(this.object)
  //     console.log(newarr)
  //     console.log(this.userObject)
  //     const params = { force: true };

  //     this.gridApi.refreshCells(params);

      // function updateSum(data){
      //  var summ = new AgGridAngular(elementDef: ElementRef<any>, viewContainerRef: ViewContainerRef, angularFrameworkOverrides: AngularFrameworkOverrides, frameworkComponentWrapper: AngularFrameworkComponentWrapper, componentFactoryResolver: ComponentFactoryResolver)
      //  { 


         
      //    renderAt: sum}

      // }

  

}

 
  
  
  gridOptions1={
    
  }
  onCellValueChanged(params) {
    const colId = params.column.getId();
      colId.sendActToBia(params.data);

  }

  onGridReady2(params){
    this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      const userObject = JSON.parse(this.object)
    //this.getUserObject
     let aa = userObject.slice(1,2)   
      this.gridApi.setRowData(this.rowData);

     // this.gridApi.refreshCells(this.arr);

  }
  onGridReady1(params){
    this.gridApi1 = params.api;
      this.gridColumnApi1 = params.columnApi;
      this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
      const userObject = JSON.parse(this.object)
   // this.getUserObject
     let userObject1 = userObject.slice(1,)
       params.api.setRowData(userObject1);
      // this.gridApi1.refreshCells(params);

    
  }

  updateEvenRowData = () => {
    this.dataService.sharedParam.subscribe(param=>this.object=JSON.stringify(param))
  const userObject = JSON.parse(this.object)
    let newRowData = userObject.map((row, index) => {
     
      return row;
    });
    this.userObject = newRowData;
  };

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




function getMax(arr, prop) {
  var max=parseInt(arr[0].data[0][prop])
  for(let j=0;j<arr.length;j++){
    for (var i=1 ; i<arr[j].data.length ; i++) {
    if (parseInt(arr[j].data[i][prop]) > max){
      max=parseInt(arr[j].data[i][prop])
    }
  }   

  }
   
  if(max>20){
    return max
  }  
  return 20;
}
function getMin(arr, prop) {
  var min=parseInt(arr[0].data[0][prop])    
  
  for(let j=0;j<arr.length;j++){
    for (var i=1 ; i<arr[j].data.length ; i++) {
      if (parseInt(arr[j].data[i][prop]) < min){
        min=parseInt(arr[j].data[i][prop])
      }
    }
    
  }
  
  if(min<-20){
    return min
  }
  return -20;
}
  

