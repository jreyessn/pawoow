import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PawwowService } from 'src/app/services/pawwow.service';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {

  responseData          : any;
  responseDataComents   : any;
  responseDataResult    : any [] = [];
  responseDataResultComents  : any [] = [];
  responseItem          : any [] = [];
  responseItemComments : any [] = [];
  tabLoadTimes          : Date[] = [];

  constructor(public pawwowService: PawwowService,
              private router : Router) { }

  ngOnInit(): void {
    this.pawwowService.getSuggestions().subscribe((data : any)=>{
      this.responseData = data;
      // this.veterinary = this.veterinaryResponse.result;
      // this.getItemVeterinary(this.veterinary);
      if(this.responseData.status=1000){
        console.log(data)
        this.responseDataResult = this.responseData.result;
        this.responseDataResult.forEach(element => {
          this.responseItem.push(element);
        });
      }else{
        console.log('Fallo el API de SUGERENCIAS');
      }
      console.log(this.responseItem);
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
      this.router.navigate(['/']);
    });

    this.pawwowService.getComments().subscribe((data : any)=>{
      this.responseDataComents = data;
      // this.veterinary = this.veterinaryResponse.result;
      // this.getItemVeterinary(this.veterinary);
      if(this.responseDataComents.status=1000){
        console.log(data)
        this.responseDataResultComents = this.responseDataComents.result;
        this.responseDataResultComents.forEach(element => {
          this.responseItemComments.push(element);
        });
      }else{
        console.log('Fallo el API de COMENTARIOS');
        console.log('Inautorizado');
        this.router.navigate(['/login']);
      }
      console.log(this.responseItemComments );
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
    });
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }

}
