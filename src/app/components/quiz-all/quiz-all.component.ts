import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';
const KEY_DOC :string = "sHs4sLHBMxOSpW98y52g"

@Component({
  selector: 'app-quiz-all',
  templateUrl: './quiz-all.component.html',
  styleUrls: ['./quiz-all.component.css']
})
export class QuizAllComponent implements OnInit {

 

  list :  NodeListOf<Element> =  document.querySelectorAll('.list');
  allNiveau : {[key:string]: any} = JSON.parse(localStorage.getItem('quizez'))
  selectQcm : any
  edited: boolean = false
  newLevel: boolean  =false
  updateQcmOptions : [string] = [""]

 
  constructor(private usersSrvc :UsersService)
     {
  }

  removeQcmItem(e:any){
    if (!e.target.matches("[data-button-delete]")) return
    
    const parent = e.target.closest(".listOfQcm")
    this.updateQcmOptions.splice(parent.id,1)
    // 
  }

  submit(e:any) {
    e.preventDefault()
    const parentQcm = e.target.querySelector(".form-edit-qcm")
    const parentLevel = e.target.closest(".top-class")
    let points = e.target.points.value
    let tag = e.target.tag.value
    let question = e.target.question.value
    let response = e.target.response.value
    this.allNiveau[parentLevel.id][parentQcm.id] = {
      "question": question,
      "option": this.updateQcmOptions,
      "tag": tag,
      "point": +points,
      "answer": +response
    }
    JSON.parse(localStorage.getItem('quizez'))
    this.usersSrvc.updateQuiz(KEY_DOC,{
      niveau: this.allNiveau
    })
    localStorage.setItem("quizez", JSON.stringify(this.allNiveau))
    this.edited  = false
    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to Edit qcm '+parentQcm.id+' inside level : '+parentLevel.id ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Accepted!',
          'qcm '+parentQcm.id+' updated ',
          'success'
        )
      } 
    })
   
  }
  addOption(e: any){
    e.preventDefault()
    let inputOptionValue = (<HTMLInputElement>document.querySelector("#input-add"))
    if (inputOptionValue.value === "") return
    this.updateQcmOptions.push(inputOptionValue.value)
    inputOptionValue.value = ""
  }

  editClick(event:any){
    this.edited = true
  
    const parentQcm = event.target.closest(".qcm")
    const parentLevel = event.target.closest(".level")
    this.selectQcm = {
      "qcm" : this.allNiveau[parentLevel.id][ parentQcm.id],
      "level" : parentLevel.id,
      "qcmid": parentQcm.id
     } 
    this.updateQcmOptions = this.allNiveau[parentLevel.id][ parentQcm.id].option
    
    this.newLevel = false;
    window.scrollTo(0,document.body.scrollHeight);
  }

  removeLevel(event:any){
    event.stopPropagation(); 
    const parent = event.target.closest(".level")
    delete this.allNiveau[parent.id]; 
    localStorage.setItem("quizez", JSON.stringify(this.allNiveau))


    this.usersSrvc.updateQuiz(KEY_DOC,{
      niveau: this.allNiveau
    })


    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to delete this level : ' ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Accepted!',
          'level removed',
          'success'
        )
        this.newLevel = false;
      } 
    
    })
   
  }

  
  ngOnInit(): void {
    
  }

  niveauClick(e:any){
    (e.path[1].classList.contains('active'))? e.path[1].classList.remove('active'):e.path[1].classList.add('active');
  }
  qcmClick(e:any){
    e.stopPropagation(); 
    let test = e.path[1].classList.contains("active") ||e.path[3].classList.contains("active")
    if(e.path[1].classList.contains('active')){
      e.path[1].classList.remove('active');
    }
    else if(test){
      e.path[1].classList.add('active');
    }
    else{
      e.path[1].classList.add('active');
    }
  }

  optionClick(e:any){
    e.stopPropagation(); 
    let test = e.path[3].classList.contains("active") || e.path[5].classList.contains("active")
    if(e.path[1].classList.contains('active')){
      e.path[1].classList.remove('active');
    }
    else if(test){
      e.path[1].classList.add('active');
    }
    else{
      e.path[1].classList.add('active');
    }
  }

  addLevel(e:any){
    this.updateQcmOptions.splice(0,1)
    this.newLevel = true;
    this.edited = false;
    const parentLevel = e.target.closest(".level")
   if (this.updateQcmOptions.length > 0){
    this.updateQcmOptions = [""]
    this.updateQcmOptions.splice(0,1)
   }
    this.selectQcm = {
      "level" : parentLevel.id,
     } 

     window.scrollTo(0,document.body.scrollHeight);

  }

  submitLevel(e:any){
    this.newLevel = false;
    const parentLevel = e.target.closest(".top-class")
    let points = e.target.points.value
    let tag = e.target.tag.value
    let question = e.target.question.value
    let response = e.target.response.value
    this.allNiveau[parentLevel.id].push(
      {
      "question": question,
      "option": this.updateQcmOptions,
      "tag": tag,
      "point": +points,
      "answer": +response
    })
    localStorage.setItem("quizez", JSON.stringify(this.allNiveau))
    this.usersSrvc.updateQuiz(KEY_DOC,{
      niveau: this.allNiveau
    })

    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to add a new qcm into level'+parentLevel.id+' : ' ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Accepted!',
          'qcm addded into level '+ parentLevel.id,
          'success'
        )
      } 
    
    })

  }

  addNewLevel(e:any){
    let arrayLevels = Object.keys(this.allNiveau)
    let newLavel = +arrayLevels[arrayLevels.length -1] + 1
    this.allNiveau[newLavel] = new Array()
    localStorage.setItem("quizez", JSON.stringify(this.allNiveau))
    this.usersSrvc.updateQuiz(KEY_DOC,{
      niveau: this.allNiveau
    })

    Swal.fire({
      title: 'Are you sure?',
      text: 'you want to add a new level : ' ,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Accept it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Accepted!',
          'level addded ',
          'success'
        )
      } 
    
    })
  }
}
