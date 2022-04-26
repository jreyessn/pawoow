import { Component, Inject, OnInit } from '@angular/core';
import { PawwowService } from 'src/app/services/pawwow.service';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-questions-component',
  templateUrl: './edit-questions-component.component.html',
  styleUrls: ['./edit-questions-component.component.css']
})
export class EditQuestionsComponentComponent implements OnInit {

  questionForm = new FormGroup({
    code: new FormControl(''),
    question: new FormControl({value: this.data.datakey.descripcion, disabled: false}),
    //description: new FormControl({value: this.data.datakey.descripcion, disabled: false}),
  });


  constructor(public pawwowService: PawwowService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    console.log(this.data.datakey);
  }


  Accept(){
    var code = this.data.datakey.codigo;
    var question = this.questionForm.value.question
    //var desc = this.questionForm.value.description;
    this.pawwowService.editQuestion(code, question).subscribe(data => {
      //this.OneItem.push(data);
      console.log(data)
     });
     location.reload();
  }

}
