import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { AddLevelComponent } from './components/add-level/add-level.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ListAttenteComponent } from './components/list-attente/list-attente.component';
import { LoginComponent } from './components/login/login.component';
import { QuizAllComponent } from './components/quiz-all/quiz-all.component';


const routes: Routes = [

  {path:'', component:LoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'user/:id', component:DetailUserComponent},
  {path:'users/list_attente', component:ListAttenteComponent},
  {path:'actualités', component:ActualitesComponent},
  {path:'level', component:AddLevelComponent},
  {path:'quiz-all', component:QuizAllComponent},


  


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
