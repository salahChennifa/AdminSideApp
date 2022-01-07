import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user';
import { map } from 'rxjs/operators';
import {News} from '../models/actualité'
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private afs : AngularFirestore ) { }



  getAll(email:string){


  
    return this.afs.collection('users', ref=> ref.where('email','!=',email)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }


   getOne(id:string){
  

      return this.afs.collection('users').doc(id).valueChanges();

  
   }


   getUserNotAccepted(accepted:boolean){

    
    return this.afs.collection('users', ref=> ref.where('accepted','==',accepted)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }


   acceptUser(user:User){
    return this.afs.collection('users').doc(user.userId)
    .update(user);
   }


   listOfActualités(){
    return this.afs.collection('actualités').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as News ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
   }


   addNews(news:News){
    this.afs.collection('actualités').add(news);
    
  }

  updateQuiz(id:string, level:any){
    this.afs.collection('quiz').doc(id).update(level);
  }

  deleteActualite(id:string){
    this.afs.collection('actualités').doc(id).delete()
  }

  updateActualite(id:string, actualite : any){
    this.afs.collection("actualités").doc(id).update(actualite)
  }

  
}
