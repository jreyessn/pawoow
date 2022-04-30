import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Veterinary, VeterinaryResponse } from 'src/app/Models/Veterinary';
import { PawwowService } from 'src/app/services/pawwow.service';
import { EditVeterinaryComponent } from '../edit-veterinary/edit-veterinary.component';

@Component({
  selector: 'app-veterinary',
  templateUrl: './veterinary.component.html',
  styleUrls: ['./veterinary.component.css']
})
export class VeterinaryComponent implements OnInit {

  veterinaryForm = new FormGroup({
    name: new FormControl({value: 'La Torre - Clínica Veterinaria', disabled: true}),
    address: new FormControl({value: 'Calle Cajamarca Mz K Lote 15, Urb. La Ciudadela - Chiclayo', disabled: true}),
    schedule: new FormControl({value: 'Abierto las 24 horas', disabled: true}),
    urlmap: new FormControl({value: 'https://maps.app.goo.gl/BRkTSCtGgQLmnJU49', disabled: true}),
    urlinstagram: new FormControl({value: 'https://www.instagram.com/latorre.vet', disabled: true}),
    urlfacebook: new FormControl({value: 'https://www.facebook.com/109286577615248', disabled: true}),
    idfacebook: new FormControl({value: '109286577615248', disabled: true}),
  });

  veterinaryResponse  : any;
  veterinary!         : Veterinary;
  name                :any;

  constructor(public pawwowService: PawwowService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {

    this.pawwowService.getVeterinaryData().subscribe((data : any)=>{
      this.veterinaryResponse = data;
      this.veterinary = this.veterinaryResponse.result;
      this.getItemVeterinary(this.veterinary);
    },
    (err : HttpErrorResponse)=>{
      console.log(err);
    });
  }



  public getItemVeterinary(value){
    console.log(value.nombre)
    // var name =value.nombre;
    this.veterinaryForm.value.name = value.nombre;
    this.veterinaryForm.value.address = value.direccion;
    this.veterinaryForm.value.schedule = value.horario;
    this.veterinaryForm.value.urlmap = value.urlMaps;
    this.veterinaryForm.value.urlinstagram = value.urlinstagram;
    this.veterinaryForm.value.urlfacebook = value.urlFacebook;
    this.veterinaryForm.value.idfacebook = value.idPageFacebook;
  }

  public editVeterinary(){
    console.log('Into ... editVeterinary');
      this.dialog.open(EditVeterinaryComponent);
  }

}
