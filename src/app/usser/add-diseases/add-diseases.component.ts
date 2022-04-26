import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { element } from 'protractor';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Recomendations, RecomendationsResponse } from 'src/app/Models/Recomendations';
import { PawwowService } from 'src/app/services/pawwow.service';
import { AddRecomendationComponent } from '../add-recomendation/add-recomendation.component';

@Component({
  selector: 'app-add-diseases',
  templateUrl: './add-diseases.component.html',
  styleUrls: ['./add-diseases.component.css']
})
export class AddDiseasesComponent implements OnInit {
  myControl               = new FormControl();
  filteredOptions         : Observable<string[]> | undefined;
  theOptionSelected       : any;

  diseaseForm = new FormGroup({
    // code: new FormControl(''),
    disease: new FormControl(''),
    description: new FormControl(''),
    level: new FormControl(''),
    recommendation: new FormControl(''),
    r_title: new FormControl(''),
    r_description: new FormControl(''),
  });

  recomendationsResponse!   : RecomendationsResponse;
  recomendations            : Recomendations [] = [];
  names                     : string [] = [];
  checked            : boolean = false;

  message : string = "";

  constructor(public pawwowService: PawwowService,
              public dialog: MatDialog,
              private cdRef: ChangeDetectorRef,
              public dialogRef: MatDialogRef<AddDiseasesComponent>) { }

  ngOnInit(){
    this.pawwowService.getRecomendation().subscribe(res => this.getItemDiseases(res));
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }

  ngAfterViewChecked(): void {
		this.cdRef.detectChanges();
	}

  private _filter(value: any): any {
    var nameTheOption = value;
    const filterValue = value.toLowerCase();
    this.theOptionSelected = nameTheOption;
    console.log(this.theOptionSelected)
    return this.names.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
 }

  getItemDiseases(res){
    this.recomendationsResponse = res;
    console.log(this.recomendationsResponse);
    if(this.recomendationsResponse.result.length>0){
      this.recomendations = this.recomendationsResponse.result;
      this.recomendations.forEach(element =>{
        // var names = element.codEnfermedad;
        var names = element.titulo;
        this.names.push(names);
      });
      }else{
        console.log('Sin Recomendaciones para mostrar');
      }
  console.log(this.names);
  }

  recommendationControl(value){
    this.checked = !value;
    //this.checked = !value;
  }


  Accept(){
    // var code = this.diseaseForm.value.code;
    var disease = this.diseaseForm.value.disease;
    var desc = this.diseaseForm.value.description;
    var level = this.diseaseForm.value.level;
    // var recommendation = this.diseaseForm.value.recommendation;
    var r_title = this.diseaseForm.value.r_title;
    var r_description = this.diseaseForm.value.r_description;
    this.pawwowService.createDisease(disease, desc, level, r_title, r_description).subscribe(data => {
      //this.OneItem.push(data);
      console.log(data)
     });
    this.dialogRef.close();
    location.reload();
  }

  public addRecomendation(){
    console.log('addSymptoms');
    this.dialog.open(AddRecomendationComponent);
  }

}
