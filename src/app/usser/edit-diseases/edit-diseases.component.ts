import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PawwowService } from 'src/app/services/pawwow.service';

@Component({
  selector: 'app-edit-diseases',
  templateUrl: './edit-diseases.component.html',
  styleUrls: ['./edit-diseases.component.css']
})
export class EditDiseasesComponent implements OnInit {

  diseaseForm = new FormGroup({
    code: new FormControl(''),
    disease: new FormControl({value: this.data.datakey.nombre, disabled: false}),
    description: new FormControl({value: this.data.datakey.descripcion, disabled: false}),
  });

  constructor(public pawwowService: PawwowService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.datakey);
  }

  Accept(){
    var code = this.data.datakey.codigo;
    var disease = this.diseaseForm.value.disease;
    var desc = this.diseaseForm.value.description;
    this.pawwowService.editDisease(code, disease, desc).subscribe(data => {
      //this.OneItem.push(data);
      console.log(data)
     });
     location.reload();
  }

}
