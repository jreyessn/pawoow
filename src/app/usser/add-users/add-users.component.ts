import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/Models/Rol';
import { PawwowService } from '../../services/pawwow.service';
import { AbstractControl } from "@angular/forms";

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css']
})
export class AddUsersComponent implements OnInit {

  title: string = "";

  formUser!: FormGroup;

  roles$!: Observable<Rol[]>;

  constructor(
    public pawwowService: PawwowService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AddUsersComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.formUser = this.formBuilder.group({
      idUsuario: [ 0 ],
      usuario:   [ null, Validators.required],
      clave:     [ null, Validators.required ],
      confirmar_clave: [ null, [ Validators.required, this.passwordMatch('clave') ] ],
      nombre:   [ null, Validators.required ],
      apellido: [ null, Validators.required ],
      idRol:    [ 1 , Validators.required]
    })

    this.roles$ = this.pawwowService.getRoles()

    this.subscribeChangesForm()
    this.checkEdit()
  }

  checkEdit(){
    if(this.data){
      this.formUser.patchValue(this.data)

      this.formUser.get('clave')?.clearValidators();
      this.formUser.get('confirmar_clave')?.setValidators([ this.passwordMatch('clave') ])
      this.formUser.get('clave')?.updateValueAndValidity({ onlySelf: true });    
      this.formUser.get('confirmar_clave')?.updateValueAndValidity({ onlySelf: true }); 
    }
  }

  /**
   * Eventos ocurridos en el formulario
   */
   subscribeChangesForm(){
    this.formUser.get('clave')?.valueChanges.subscribe(() => {
      this.formUser.get("confirmar_clave")?.updateValueAndValidity()
    })
 
  }



  private passwordMatch (controlName: string) {
      return (c: AbstractControl): {[key: string]: any} | null => {
        if(!c.parent){
            return null;
        }
        if (c?.value?.trim() === c.parent.controls[controlName]?.value?.trim() || false)
          return null;
        return { passwordMatch: true };
      }
  }


  Accept(){
    if(this.formUser.invalid){
      return this.formUser.markAllAsTouched()
    }
    
    let data = { ... this.formUser.value };
        data.estado = true;
        data.idRol = parseInt(data.idRol)

    this.pawwowService.createUser(data).subscribe(() => {
      this.dialogRef.close();
    });
  }

}
