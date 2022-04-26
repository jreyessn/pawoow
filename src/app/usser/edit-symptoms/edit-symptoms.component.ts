import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PawwowService } from 'src/app/services/pawwow.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-edit-symptoms',
  templateUrl: './edit-symptoms.component.html',
  styleUrls: ['./edit-symptoms.component.css']
})
export class EditSymptomsComponent implements OnInit {

  //@Input() row: any;
  symptomForm = new FormGroup({
    code: new FormControl(''),
    symptom: new FormControl({value: this.data.datakey.nombre, disabled: false}),
    description: new FormControl({value: this.data.datakey.descripcion, disabled: false}),
  });

  constructor(public pawwowService: PawwowService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.datakey);
  }

  Accept(){
    var code = this.data.datakey.codigo;
    var symptom = this.symptomForm.value.symptom
    var desc = this.symptomForm.value.description;
    this.pawwowService.editSymptom(code, symptom, desc).subscribe(data => {
      //this.OneItem.push(data);
      console.log(data)
     });
     location.reload();
  }


}
