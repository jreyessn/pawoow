import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
import {MatProgressSpinnerModule, MatSpinner} from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';


@NgModule({
  declarations: [
  ],
  imports: [
    MatProgressSpinnerModule,
    CommonModule,
    OverlayModule
  ],
  exports: [
    MatProgressSpinnerModule
  ]
})
export class SpinnerModule { }
