import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Questions } from 'src/app/Models/Questions';
import { PawwowService } from 'src/app/services/pawwow.service';

@Component({
  selector: 'app-add-rules',
  templateUrl: './add-rules.component.html',
  styleUrls: ['./add-rules.component.css']
})
export class AddRulesComponent implements OnInit {

  rulesForm = new FormGroup({
    code        : new FormControl(''),
    question    : new FormControl(''),
    isMain      : new FormControl({value: false, disabled: false}),
    questionYes : new FormControl(''),
    questionNot : new FormControl(''),
    diaseaseYes : new FormControl(''),
    diaseaseNot : new FormControl(''),
  });

  //{value: 'Abierto las 24 horas', disabled: true}

  //Questions = new FormControl();

  questionsResponse    : any;
  questions            : Questions [] = [];

  message              : string = "";
  //router               : any;
  checked              : boolean = false;
  constructor(public pawwowService: PawwowService,
              private router : Router,
              public dialogRef: MatDialogRef<AddRulesComponent>) { }

  ngOnInit(): void {
    this.getQuestions();
    //console.log(this.message);
  }



  getQuestions() {
    this.pawwowService.getQuestions().subscribe((data : any)=>{
      if(data.statusCode === 1000){
        this.questionsResponse = data;
        this.getItemQuestions();
      }else{
        console.log('Inautorizado');
        this.router.navigate(['/login']);
      }
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
      this.router.navigate(['/']);
    });
  }

  public getItemQuestions(){
    let questions = this.questionsResponse.result;
    questions.forEach(element => {
     this.questions.push(element);
    });
    console.log(this.questions);
    //this.dataSource = new MatTableDataSource(this.questions);
    //this.iterator();
  }

  Accept(){
    var codSintoma = this.message;
    var codDiagnostico = this.rulesForm.value.question;
    var codDiagSi = this.rulesForm.value.questionYes;
    var codDiagNo = this.rulesForm.value.questionNot;
    var codEnfeSi = this.rulesForm.value.diaseaseYes;
    var codEnfeNo = this.rulesForm.value.diaseaseNot;
    var isMain = this.rulesForm.value.isMain;
    console.log(codSintoma,codDiagnostico,codDiagSi,codDiagNo,codEnfeSi,codEnfeNo,isMain)
    this.pawwowService.createRule(codSintoma,codDiagnostico,codDiagSi,codDiagNo,codEnfeSi,codEnfeNo,isMain).subscribe(data => {
      //this.OneItem.push(data);
      console.log(data)
     });
     //this.dialogRef.close();
     //location.reload();
  }

  Cancel(){

  }

  setQuestion(e: any){
    console.log(e.value)
  }

  setQuestionAsMain(value){
    this.checked = !value;
    //this.checked = !value;
  }

}
