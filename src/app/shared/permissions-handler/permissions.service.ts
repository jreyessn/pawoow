import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Permiso, PermisoResponse } from '../../Models/Permisos';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  private baseUrl = "http://pawwow-002-site1.ctempurl.com"

  private _permissions: BehaviorSubject<Permiso[]> = new BehaviorSubject<Permiso[]>([]);

  constructor(
    private httpClient: HttpClient,
  ) { }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Getter for permissions
  */
  get permissions$(): Observable<Permiso[]>
  {
      return this._permissions.asObservable();
  } 

  /**
   * Verifica si el behaviour tiene los permisos del usuario y los devuelve.
   * Caso contrario, los obtiene del servidor y los guarda el behaviour
   * 
   * @returns {Observable<Permiso[]>}
   */
  getPermissions(): Observable<Permiso[]>{
    var token   = localStorage.getItem("user_token");
    var headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.permissions$.pipe(
      switchMap((permissions: Permiso[]) => {

        if(permissions.length == 0){
          return this.httpClient.get<any>(`${this.baseUrl}/restapi/api/Permiso`, { headers })
                      .pipe(
                        map((data: PermisoResponse) => {
                          this._permissions.next(data.result)

                          return data.result
                        }),
                      )
        }

        return of(permissions)
      }),
      catchError(() => {
        this._permissions.next([])
        return of([])
      })
    )
  }

  /**
   * Reinicia los permisos del behaviour
   */
  resetPermissions(): void{
    this._permissions.next([])
  }

}
