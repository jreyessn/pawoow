import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PawwowService } from '../services/pawwow.service';
import { DOCUMENT } from '@angular/common';
import { PermissionsService } from '../shared/permissions-handler/permissions.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit, OnDestroy {
  isLogginError : boolean = false;
  title = 'PawoowProject';

  isPasswordVisible: boolean = false

  constructor(
    public pawwowService: PawwowService, 
    public _permissionsService: PermissionsService, 
    private router : Router,
    @Inject(DOCUMENT) private _document  
  ) { }

  ngOnInit() { 
    this._document.body.classList.add("bg-white")
  }
  
  ngOnDestroy(){
    this._document.body.classList.remove("bg-white")
  }

  OnSubmit(email,password){
    console.log('into sign in');
    this.pawwowService.userAutentication(email,password).subscribe((data : any)=>{
      console.log(data);
      if(data.statusCode === 1000){
        let token = data.result.token;
        let name = data.result.nombre;
        let apellido = data.result.apellido;
        let verificador = data.result.verificador;
        
        this.pawwowService.setTokenInLocalStorage(token);
        this.pawwowService.setNameInInLocalStorage(name,apellido,verificador);
        this._permissionsService.resetPermissions()

        this.router.navigate(['/dashboard/home']);
      }else{
        console.log('Fallo inicio de Sesion');
      }
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
    });
  }
}



/**
 * import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PawwowService } from './services/pawwow.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isLogginError : boolean = false;
  title = 'PawoowProject';
  constructor(public pawwowService: PawwowService, private router : Router) { }

  ngOnInit() {  }

  OnSubmit(email,password){
    console.log('into sign in');
    this.pawwowService.userAutentication(email,password).subscribe((data : any)=>{
      console.log(data);
      //localStorage.setItem('userToken',data.access_token);
      //this.router.navigate(['/home']);
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
      //this.isLogginError = true;
      //this.pawwowService.getErrorInSingInPopup("Vaya!");
    });

  }
}
 *
 *
 */
