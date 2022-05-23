import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { home } from '../Model/homeModel';
import { async, switchMap, tap } from 'rxjs';
import { data } from 'jquery';
@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit{
  home=new home()
  dataarray:home[]=[]
  constructor(private http:HttpClient,private router:Router) { }
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
    async funct1(csvPath: string,csvPathName: string,num:number){
      this.resp= await fetch('http://localhost:8080/importCSV/path?pathh='+csvPath+'&csvname='+csvPathName+"&numOfCsv="+num)
      .then(function(response){
        response.json().then(function(data) {
          console.log(data);
          });
    })
    
    }
  async uploadFiles(pageName:string){
    let pathh=this.csvRef; let csvname=this.csvRefName; let n_input=this.dataarray.length+1
    const httpParams= new HttpParams().set(pathh,csvname)
    let num=1;
    await fetch('http://localhost:8080/importCSVLength/length?n_input='+n_input)
    await this.funct1(pathh,csvname,num)
    for(let i=0;i<this.dataarray.length;i++){
      num=i+2;
      await this.funct1(this.dataarray[i].path,this.dataarray[i].pathName,num)
    }
    this.router.navigate([`${pageName}`])
  }

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
