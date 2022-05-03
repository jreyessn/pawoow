import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  /**
   * Success notify
   * 
   * @param {string} message
   */
  success(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 5000,
      panelClass: "notify-success",
      verticalPosition: "top",
      horizontalPosition: "end"
    })
  }

  /**
   * Error notify
   * 
   * @param {string} message
   */
  error(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 5000,
      panelClass: "notify-error",
      verticalPosition: "top",
      horizontalPosition: "end"
    })
  }

  /**
   * Info notify
   * 
   * @param {string} message
   */
  info(message: string){
    this._snackBar.open(message, "Cerrar", {
      duration: 5000,
      panelClass: "notify-info",
      verticalPosition: "top",
      horizontalPosition: "end"
    })
  }

}
