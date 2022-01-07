import { Component, OnInit,ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-level',
  templateUrl: './add-level.component.html',
  styleUrls: ['./add-level.component.css']
})
export class AddLevelComponent implements OnInit {
  list :  NodeListOf<Element> =  document.querySelectorAll('.list');
  allNiveau : {[key:string]: any} = {
      "1": [
        {
          "question": "comment peut on arrêter la pollution ?",
          "option": [
            "réduire le plus possible les doses de produits d’entretien",
            "Regrouper les restes de produits toxiques"
          ],
          "tag": "pollution",
          "point": 50,
          "answer": 1
        },
        {
          "answer": 2,
          "option": [
            "Vaste étendue de terrain couverte d'arbres",
            "simple lieu",
            "Une forêt est un milieu naturel"
          ],
          "point": 50,
          "question": "c'est quoi la foret?",
          "tag": "foret"
        }
      ],
      "2": [
        {
          "point": 25,
          "tag": "hygiène",
          "answer": 0,
          "option": [
            "oui",
            "non, pas forcément"
          ],
          "question": "pensez vous respecter les règles d'hygiène"
        },
        {
          "option": [
            "bien",
            "très bien",
            "normale"
          ],
          "tag": "propreté",
          "answer": 1,
          "question": "que pensez vous de la propreté à l'intérieur",
          "point": 75
        }
      ],
      "3": [
        {
          "point": 25,
          "question": " L’air se compose de : ",
          "option": [
            "78% de d’azote, 21% d’oxygène et 1% de gaz divers et particules fi nes ",
            "78% d’oxygène, 21% de dioxyde de carbone et 1% d’hélium",
            "78% d’oxygène, 21% de dioxyde de carbone et 1% d’eau"
          ],
          "tag": "L'air",
          "answer": 2
        },
        {
          "answer": 1,
          "question": " La fumée de cigarette contient ?",
          "point": 25,
          "tag": "cigarette",
          "option": [
            " Près de 300 substances toxiques dont 50 cancérigènes ",
            "Près de 300 000 substances toxiques dont 5000 cancérigènes"
          ]
        },
        {
          "tag": "nettoyage",
          "answer": 1,
          "question": "Pour désinfecter une chambre d’hôpital, j’utilise tous les jours le même produit",
          "option": [
            "Vrai",
            "Faux"
          ],
          "point": 25
        },
        {
          "question": "Avant d’utiliser une machine électrique je vérifie toujours le câble électrique",
          "point": 25,
          "answer": 1,
          "option": [
            "vrai",
            "faux"
          ],
          "tag": "machine"
        }
      ]
    
  }
  selectQcm : any
  edited: boolean = false
  newLevel: boolean  =false
  updateQcmOptions : [string] = [""]

 
  constructor(
    
    ) {}

  removeQcmItem(e:any){
    if (!e.target.matches("[data-button-delete]")) return
    console.log("delete is clicked")
    const parent = e.target.closest(".listOfQcm")
    console.log("index of options", parent.id)
    this.updateQcmOptions.splice(parent.id,1)
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
  this.edited  = false
   
  }
  addOption(e: any){
    e.preventDefault()
    let inputOptionValue = (<HTMLInputElement>document.querySelector("#input-add"))
    if (inputOptionValue.value === "") return
    this.updateQcmOptions.push(inputOptionValue.value)
    inputOptionValue.value = ""
  }

  editClick(event:any){
    event.stopPropagation(); 
    const parentQcm = event.target.closest(".qcm")
    const parentLevel = event.target.closest(".level")
    this.selectQcm = {
      "qcm" : this.allNiveau[parentLevel.id][ parentQcm.id],
      "level" : parentLevel.id,
      "qcmid": parentQcm.id
     } 
    this.updateQcmOptions = this.allNiveau[parentLevel.id][ parentQcm.id].option
    this.edited = true
  }

  removeLevel(event:any){
    event.stopPropagation(); 
    const parent = event.target.closest(".level")
    console.log("parent to use : ",  parent.id)
    delete this.allNiveau[parent.id]; 
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
    const parentLevel = e.target.closest(".level")
    this.selectQcm = {
      "level" : parentLevel.id,
     } 
    

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
  }

  addNewLevel(e:any){
    console.log("add a new lavel",e)
    let arrayLevels = Object.keys(this.allNiveau)
    let newLavel = +arrayLevels[arrayLevels.length -1] + 1
    this.allNiveau[newLavel] = new Array()
  }
}
