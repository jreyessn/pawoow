import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Symptoms } from 'src/app/Models/Symptoms';
import { PawwowService } from 'src/app/services/pawwow.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  questionForm = new FormGroup({
    code: new FormControl(''),
    //symptoms:  new FormArray([]),
    question: new FormControl(''),
  });

  symptomsList = new FormControl();

  message             : string = "";
  symptomsResponse    : any;
  symptoms            : Symptoms [] = [];
  codesSymptoms       : string = "";
  final               : any[] = [];

  constructor(public pawwowService: PawwowService,
              public dialogRef: MatDialogRef<AddQuestionComponent>,
              private router : Router) { }

  ngOnInit(): void {
    this.getSymptoms();
  }


  getSymptoms(){
    this.pawwowService.getSymptoms().subscribe((data : any)=>{
      if(data.statusCode === 1000){
        this.symptomsResponse = data;
        this.getItemSymptoms();
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

  getItemSymptoms(){
    let symptoms = this.symptomsResponse.result;
    symptoms.forEach(element => {
     this.symptoms.push(element);
    });
    console.log(this.symptoms);
    console.log(this.symptoms.length);
    //this.iterator();
    //asignarle solo los 10 primeros elementos del arreglo
    //this.dataSource = new MatTableDataSource(this.symptoms);
  }

  getCodeOfSymptoms(value: any){
    return value.map(item => ({ codigo: item.codigo }))
  }


  Accept(){
    //var code = this.questionForm.value.code;
    var symptoms = this.symptomsList.value;
    this.final   = this.getCodeOfSymptoms(symptoms);
    //this.codesSymptoms = "sintomas: ["+this.final+"]";
    var desc = this.questionForm.value.question;
    console.log(desc);
    this.pawwowService.createQuestion(desc,this.final).subscribe(data => {
      //this.OneItem.push(data);
      console.log(data)
     });
     this.dialogRef.close();
     //location.reload();
  }

  Cancel(){

  }

}
