import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { home } from '../Model/homeModel';
import { async, Observable, switchMap, tap } from 'rxjs';
import { data } from 'jquery';
import { DataService } from '../data.service';
import { Variable } from '@angular/compiler/src/render3/r3_ast';
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit{
  
  home=new home()
  dataarray:home[]=[]


//a = this.dataarray.length; 
  
// passDataToService() {
//   this.dataService.allPassedData.next(this.obj); 
                                            
//  }
  ngOnInit(){
    this.dataarray.push(this.home)
    
  }
  
  uploadForm = document.querySelector("#fileUploadForm");
  uploadFormInput = document.querySelector("#fileUploadInput");
  downloadFile = document.querySelector("#downloadFileUrl");
  singleFileUploadError = document.querySelector('#singleFileUploadError');
  csvRef: string 
  csvRefName:string
  resp: void
  row: string[]
  ourArray : []
  obj:Variable

  
  
    async funct1(csvPath: string,csvPathName: string,num:number){
      var out ;
      //this.resp= await fetch('http://localhost:8080/importCSV/path?pathh='+csvPath+'&csvname='+csvPathName+"&numOfCsv="+num)
      
      let resp= await fetch('http://localhost:8080/importCSV/path?pathh='+csvPath+'&csvname='+csvPathName+"&numOfCsv="+num)
      //.then(response)=>{response.json().then((data)=>
       
      console.log(resp)
      let data = await resp.text();
      return(data)
     // )}
      // .then((response) =>{
      //   response.json().then(data => out=data)
      //   .then(() => console.log(out))


      //    // console.log(this.ourArray);
      //     //console.log("hgsd" +(this.ourArray));

      //     return out


      //     });
      //     console.log(out);
    }

    
    
    
  async uploadFiles(pageName:string){
    let pathh=this.csvRef; let csvname=this.csvRefName; let n_input=this.dataarray.length+1
    const httpParams= new HttpParams().set(pathh,csvname)
    let num=1;
    var userObject;
    await fetch('http://localhost:8080/importCSVLength/length?n_input='+n_input)
    await this.funct1(pathh,csvname,num)
    for(let i=0;i<this.dataarray.length;i++){
      num=i+2;
      
      let test1 =  await this.funct1(this.dataarray[i].path,this.dataarray[i].pathName,num)
      console.log(test1)
      if(i==this.dataarray.length-1){
       userObject = JSON.parse(test1);
      console.log(userObject)}
let b = this.dataarray.length+1
      let test = await this.dataService.changeParam(userObject)
      let a =  this.dataService.changeParam2(b)
    console.log(a)

    }
    //console.log(obj)
    this.router.navigate([`${pageName}`])
  }
  constructor(private http:HttpClient,private router:Router,private dataService: DataService) {    
    

  
  }

  // get data():string{
  //   return this.dataService.sharedData;
  // }
  // set data(ourArray:string){
  //   this.dataService.sharedData=ourArray;
  // }
//   public getAllProjectsFromAPI() : Observable<any> {
//     return this.http.get( this.ourArray, { responseType: 'json' } ); 
//  }

  add_fields(){
  this.home=new home()
  this.dataarray.push(this.home)

  }

  remove_fields(index){
    if(this.dataarray.length>1){
      this.dataarray.splice(index,1)
    }
    else{
      confirm("You can not compare less than two files!");
    }
    

  }
}
