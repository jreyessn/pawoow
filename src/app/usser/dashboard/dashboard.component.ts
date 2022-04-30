import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PawwowService } from 'src/app/services/pawwow.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name!: string;

  constructor(public pawwowService: PawwowService,
              private router : Router) { }

  ngOnInit(): void {
    this.name = this.pawwowService.getNameInInLocalStorage();
  }

  public logOut(){
    console.log('logOut');
    this.pawwowService.LogOut();
    this.router.navigate(['/']);
  }

}
