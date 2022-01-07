import { Component, OnInit } from '@angular/core';
import { Timestamp } from 'rxjs/internal/operators/timestamp';
import { News } from 'src/app/models/actualité';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-actualites',
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css']
})
export class ActualitesComponent implements OnInit {
  closeResult = '';
  edited=false
  lists : News[] = []
  listNew : News = {
    title:"",
    date:"",
    body:"",
    image:"",
    likeNew:0
  }
  likeNew:number;

  addNew : News = {
    title:"",
    date:"",
    body:"",
    image:"",
    likeNew:0
  }

  added : boolean=false;

  task : AngularFireUploadTask;
  ref:AngularFireStorageReference;

  constructor(private userSrvc: UsersService,private authSrv: AuthService,
     private modalService: NgbModal,private fst : AngularFireStorage,private fs: AngularFirestore) { }

  ngOnInit(): void {

    this.authSrv.getAuth().subscribe(auth => {  
      this.userSrvc.listOfActualités().subscribe(list =>  {
        this.lists = list;
        
       this.lists.forEach((list) => {
          
          this.listNew.title = list.title;
          this.listNew.body = list.body;
          this.listNew.date = list.date;
          this.listNew.likeNew = list.likeNew;
          this.likeNew = list.likeNew;
          console.log('likeNew',this.likeNew);
       })
        
       console.log(this.lists);
     })
    })
    

  }
  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  openEdit(id){
    this.edited = true
    this.listNew = this.lists[id]
    window.scroll(0,0);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(){
    this.addNew.date = new Date().getTime() + ""
    console.log("to Dave : ", this.addNew.date)
    this.userSrvc.addNews(this.addNew);
    this.added = true;
    this.addNew  = {
      title:"",
      date:"",
      body:"",
      image:"",
      likeNew:0
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to Add this newscast' ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Accepted!',
          ' newscast Added ',
          'success'
        )
      } 
    })
  
    this.modalService.dismissAll()
  }

  onEdit(e){
    const parent = e.target.closest(".edit-actualite")
    let title = e.target.title.value
    let body = e.target.body.value
    // TODO : take the date of the current day
    let date = new Date().getTime()
    this.addNew  = {
      title:"",
      date:"",
      body:"",
      image:"",
      likeNew:0
    }
    this.edited = false
   
    // console.log("Is : ", parent.id)
    this.userSrvc.updateActualite(parent.id, {
      title:title,
      date: date,
      body: body,
      image:"",
      likeNew:0
    })
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to Edit this newscast' ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Accepted!',
          ' newscast updated ',
          'success'
        )
      } 
    })
    
    // TODO : update information into fire store
  }

  removeAcutualite(id:string){
    console.log("id : ", id)
   this.userSrvc.deleteActualite(id)
   Swal.fire({
    title: 'Are you sure?',
    text: 'you want to Delete this newscast' ,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Accept it!',
    cancelButtonText: 'No, keep it'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Accepted!',
        'newscast  deleted ',
        'success'
      )
    } 
  })
  }
}
