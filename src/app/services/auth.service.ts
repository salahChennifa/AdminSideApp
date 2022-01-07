import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afauth : AngularFireAuth,private afs: AngularFirestore) { }


  Login(email:string,password:string){
    return new Promise((resolve,reject) =>{
      this.afauth.signInWithEmailAndPassword(email,password)
      //puisque un promise on utilise then
      .then((userData)=> resolve(userData),
      (error) => reject(error))
    })
  }



  getAllQuiz(){

      return this.afs.collection('quiz').valueChanges();
 
   }

   getAuth(){
    return this.afauth.authState.pipe(map(auth=>auth));
   }

   logout(){

     this.afauth.signOut();
   }
}
