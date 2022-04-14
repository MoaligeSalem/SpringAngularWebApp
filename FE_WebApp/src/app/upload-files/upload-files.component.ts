import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { home } from '../Model/homeModel';
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
 
  uploadFiles(pageName:string){
    let pathh=this.csvRef; let csvname=this.csvRefName
    const httpParams= new HttpParams().set(pathh,csvname)
    
    this.http.get('http://localhost:8080/importCSV/path?pathh='+this.csvRef+'&csvname='+this.csvRefName).subscribe((result)=>{
      console.warn('result',result)
      })
    
    for(let i=0;i<this.dataarray.length;i++){
      this.http.get('http://localhost:8080/importCSV/path?pathh='+this.dataarray[i].path+'&csvname='+this.dataarray[i].pathName).subscribe((result)=>{
      console.warn('result',result)
      });
  
    };
    this.router.navigate([`${pageName}`])
  }

  uploadFile(pageName:string){
    const httpParams= new HttpParams({
      fromObject:{path:this.csvRef}
      })
      console.log(this,this.csvRef)
      this.http.get('http://localhost:8080/importCSV/path',{params:httpParams}).subscribe((result)=>{
      console.warn('result',result)
      });
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
