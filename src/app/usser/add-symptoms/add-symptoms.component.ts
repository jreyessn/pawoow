import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PawwowService } from 'src/app/services/pawwow.service';


@Component({
  selector: 'app-add-symptoms',
  templateUrl: './add-symptoms.component.html',
  styleUrls: ['./add-symptoms.component.css']
})
export class AddSymptomsComponent implements OnInit {


  symptomForm = new FormGroup({
    code: new FormControl(''),
    symptom: new FormControl(''),
    description: new FormControl(''),
  });

  message : string = "";


  constructor(public pawwowService: PawwowService,
              public dialogRef: MatDialogRef<AddSymptomsComponent>) { }

  ngOnInit(): void {

  }

  Accept(){
    //var code = this.symptomForm.value.code;
    var symptom = this.symptomForm.value.symptom;
    var desc = this.symptomForm.value.description;
    this.pawwowService.createSymptom(symptom, desc).subscribe(data => {
      //this.OneItem.push(data);
      console.log(data)
     });
     this.dialogRef.close();
     location.reload();
  }

  Cancel(){

  }
}
