import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLogged :boolean = false;
  constructor(private afauth : AuthService,private route : Router) { }

  ngOnInit(): void {
    this.afauth.getAuth().subscribe(auth => {
      if(auth){
        this.isLogged =  true;
     
      }else{
        this.isLogged =false;
      }
    })
  }

  onLogout(){
    this.afauth.logout();

    this.route.navigate(['/'])
    this.isLogged =false;

  }

}
