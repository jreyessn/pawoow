import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PawwowService } from 'src/app/services/pawwow.service';
import { NotifyService } from 'src/app/shared/notify/notify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  name!: string;

  constructor(public pawwowService: PawwowService,
              private _notify: NotifyService,
              private router : Router) { }

  ngOnInit(): void {
    this.name = this.pawwowService.getNameInInLocalStorage();
  }

  public logOut(){
    console.log('logOut');
    this.pawwowService.LogOut();
    this._notify.info("Desconectado correctamente")
    this.router.navigate(['/']);
  }

}
