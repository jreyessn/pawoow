import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PawwowService } from 'src/app/services/pawwow.service';

@Component({
  selector: 'app-edit-veterinary',
  templateUrl: './edit-veterinary.component.html',
  styleUrls: ['./edit-veterinary.component.css']
})
export class EditVeterinaryComponent implements OnInit {

  veterinaryForm = new FormGroup({
    name: new FormControl({value: 'La Torre - Clínica Veterinaria', disabled: false}),
    address: new FormControl({value: 'Calle Cajamarca Mz K Lote 15, Urb. La Ciudadela - Chiclayo', disabled: false}),
    schedule: new FormControl({value: 'Abierto las 24 horas', disabled: false}),
    urlmap: new FormControl({value: 'https://maps.app.goo.gl/BRkTSCtGgQLmnJU49', disabled: false}),
    urlinstagram: new FormControl({value: 'https://www.instagram.com/latorre.vet', disabled: false}),
    urlfacebook: new FormControl({value: 'https://www.facebook.com/109286577615248', disabled: false}),
    idfacebook: new FormControl({value: '109286577615248', disabled: false}),
  });


  constructor(public pawwowService: PawwowService) { }

  ngOnInit(): void {
  }

  Accept(){
    var name = this.veterinaryForm.value.name;
    var address = this.veterinaryForm.value.address;
    var schedule = this.veterinaryForm.value.schedule;
    var urlmap = this.veterinaryForm.value.urlmap;
    var urlinstagram = this.veterinaryForm.value.urlinstagram;
    var urlfacebook = this.veterinaryForm.value.urlfacebook;
    var idfacebook = this.veterinaryForm.value.idfacebook;

    this.pawwowService.putVeterinaryData(name, address, schedule, urlmap, urlinstagram, urlfacebook, idfacebook).subscribe(data => {
      //this.OneItem.push(data);
      console.log(data)
     });
  }

}
