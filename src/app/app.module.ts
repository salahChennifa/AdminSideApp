import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import {AngularFireModule} from '@angular/fire'
import {AngularFireAuthModule} from '@angular/fire/auth'
import {AngularFirestoreModule} from '@angular/fire/firestore'
import swal from 'sweetalert2';

import { environment } from 'src/environments/environment';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AppRoutingModule } from './app-routing.module';
import { AddLevelComponent } from './components/add-level/add-level.component';
import { UsersComponent } from './components/users/users.component';
import { DetailUserComponent } from './components/detail-user/detail-user.component';
import { ListAttenteComponent } from './components/list-attente/list-attente.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ActualitesComponent } from './components/actualites/actualites.component';
import { QuizAllComponent } from './components/quiz-all/quiz-all.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    DashboardComponent,
    AddLevelComponent,
    UsersComponent,
    DetailUserComponent,
    ListAttenteComponent,
    ActualitesComponent,
    QuizAllComponent
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    FormsModule,
    AppRoutingModule,
    NgbModule,
    AngularFireStorageModule,
    FormsModule,                               // <========== Add this line!
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
