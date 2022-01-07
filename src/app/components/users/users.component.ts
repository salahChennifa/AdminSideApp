import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users : User[] = []
  searchClients: User[];
  accepted:boolean;
  message:string;
  message2:string;

  constructor(private userService: UsersService,private authSrv: AuthService) { }

  ngOnInit(): void {
    
    this.authSrv.getAuth().subscribe(auth => {

  
    this.userService.getAll(auth.email).subscribe(user =>  {
      
     this.searchClients = this.users = user;
     this.users.forEach((user) => {
       console.log('user',user.accepted)
       
      
      this.message2= (user.accepted===false) ? "non approuvé"  : "";

      console.log(this.message,this.message2);
  
     })
      
     console.log(this.users);
   })
  })
  }


  
  Search(query:string){
    
      this.searchClients = (query) ? this.users.filter(user => user.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || user.email.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : this.users;
       

    
  }


}
