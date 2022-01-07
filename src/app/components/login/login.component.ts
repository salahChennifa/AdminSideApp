import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  email:string;
  password:string;
  timerInterval:any
  quizez : string;
 
constructor(private authS : AuthService,private route : Router) { }

  ngOnInit(): void {


    

    this.authS.getAllQuiz().subscribe((quiz:any) => {

      
      this.quizez = JSON.stringify(quiz[0].niveau) ;
      
      
      localStorage.setItem('quizez',this.quizez);

      
    })
  }


  log(x: any){
    console.log(x)
  }

  LoginUser(f:any){
  Swal.fire({
    title: 'Encours',
    html: 'de connexion',
    timer: 1500,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
      let b = Swal.getHtmlContainer().querySelector('b');
      this.timerInterval = setInterval(() => {
        // b.textContent = Swal.getTimerLeft().toString()
      }, 100)
    },
    willClose: () => {
      clearInterval(this.timerInterval)
    }
  }).then((result) => {
   
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
  console.log(f.value);
  
    this.authS.Login(f.value.email,f.value.password)

    .then(auth => {
      console.log('execute login function')
        if(auth) {
         
        if(f.value.email == "ecapitale@gmail.com"){
          console.log('Admin connected');

         
       
          this.route.navigate(['/dashboard']);
        
        }
        // this.route.navigate(['/']);
      }
    })
    .catch(error => {
      console.log('user NOT connected',error);
    })

    
    
   
  }



  

}
