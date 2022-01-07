import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-attente',
  templateUrl: './list-attente.component.html',
  styleUrls: ['./list-attente.component.css']
})
export class ListAttenteComponent implements OnInit {

  users : User[]=[];


  USERS : User;
  user : User ={

  BirthDate :"",
  Phone:"",
  email:"",
  name:"",
  nbrPoints:0,
  niveauUser:0,
  qcmState:0,
  userId:"",
  role:"",
  accepted:false,
  imageUrl:""
  }


  usersNotAccepted : User
  id:string;
  searchClients: User[];
  constructor(private authSrv : AuthService, private userService: UsersService,
    private route:ActivatedRoute,private router: Router,
    private afs : AngularFirestore) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.userService.getOne(this.id).subscribe(reponse =>{
    this.usersNotAccepted = reponse;
      console.log('edit '+ this.users);
    })

    this.authSrv.getAuth().subscribe(auth => {

  
      this.userService.getUserNotAccepted(false).subscribe(user =>  {
        
      this.searchClients= this.users = user;
        
       console.log(this.users);
     })
    })
  }

  update(id:string){
    

    Swal.fire({
      title: 'Are you sure?',
      text: 'Accept user with this id : ' +id,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        
          this.afs.collection('users').doc(id).update({
            accepted : true
          }).then(res => {
            console.log('updated....',res);
          }).catch(err => {
            console.error('error in updating...',err);
          })
          console.log('click update',id)

      
        Swal.fire(
          'Accepted!',
          'Client Accpted',
          'success'
        )
      
     
      } 
      this.router.navigate(['/dashboard']);
    })
  
  }

  Search(query:string){
    
    this.searchClients = (query) ? this.users.filter(user => user.name.toLocaleLowerCase().includes(query.toLocaleLowerCase()) || user.email.toLocaleLowerCase().includes(query.toLocaleLowerCase())) : this.users;
     

  
}

}
