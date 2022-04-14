import { UploadFilesComponent } from "./upload-files/upload-files.component";
import { Routes, RouterModule } from '@angular/router'; 
import { NgModule } from "@angular/core";
import { AuthenticationComponent } from "./authentication/authentication.component";
import { ComparaisonComponent } from "./comparaison/comparaison.component";
const routes:Routes=[
  {path:'uploadFiles', component: UploadFilesComponent},
  {path:'authentication', component: AuthenticationComponent},
  {path:'comparaison',component:ComparaisonComponent},

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  export const routingComponents=[UploadFilesComponent]