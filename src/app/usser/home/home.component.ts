import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from 'src/app/Models/Data';

import { PawwowService } from 'src/app/services/pawwow.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() usser: any;

  longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
  from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
  originally bred for hunting.`;

  name            : any;
  DataResponse    : any;
  Data            : Data [] = [];
  enfermedades    : any
  preguntas       : any
  sintomas        : any

  constructor(public pawwowService: PawwowService,
              private router : Router) { }

  ngOnInit(): void {
    this.name = this.pawwowService.getNameInInLocalStorage();
    this.getData();
  }

  getData(){
    console.log('getData()');
    this.pawwowService.getDataDashboard().subscribe((data : any)=>{
      if(data.statusCode === 1000){
        this.DataResponse = data;
        console.log(this.DataResponse)
        this.getItems();
      }else{
        console.log('Inautorizado');
        this.router.navigate(['/login']);
      }
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
      //this.router.navigate(['/']);
    });

  }


  public getItems(){
    let data = this.DataResponse.result;
    console.log(data);
    this.enfermedades = data.enfermedades;
    this.preguntas = data.preguntas;
    this.sintomas = data.sintomas;
    // data.forEach(element => {
    //  this.Data.push(element);
    // });
    // console.log(this.Data);
    // console.log(this.Data.length);
  }

}
