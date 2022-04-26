import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  templateUrl: './error-popup.component.html',
  styleUrls: ['./error-popup.component.css']
})
export class ErrorPopupComponent implements OnInit {

  message : string = "";
  
  constructor() { }

  ngOnInit(): void {
  }

}
