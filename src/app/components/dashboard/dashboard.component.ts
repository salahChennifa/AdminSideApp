import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  TableauLevel : any;
  users: User[] = [];
  quizez : string;
  person:any;
  t = {};
  constructor(private authSrvc : AuthService, private userService :UsersService,private router: Router) { }

  ngOnInit(): void {


  

   

   
  }




}
