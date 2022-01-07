import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.css']
})
export class DetailUserComponent implements OnInit {

  id:string;
  users: User ;
  closeResult = '';
  task : AngularFireUploadTask;
  ref:AngularFireStorageReference;
  constructor(private router: ActivatedRoute, private userService : UsersService,
    private modalService: NgbModal,private fs:AngularFirestore,private fst : AngularFireStorage ) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.userService.getOne(this.id).subscribe(reponse =>{
      
      this.users = reponse;

      console.log("detail user",this.users);
    })
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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

  uploadImage(event:any){

    const id = Math.random().toString(32).substring(2);
    this.ref = this.fst.ref(id)
    this.task = this.ref.put(event.target.files[0])
    this.task.then((data) => {
      data.ref.getDownloadURL().then(url => {
        this.fs.collection('users').doc(this.id).update({
          imageUrl : url
        })
      })
    })
    console.log('finish uploading...')
  }



}
