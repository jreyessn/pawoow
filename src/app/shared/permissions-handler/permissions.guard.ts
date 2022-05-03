import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { PermissionsService } from './permissions.service';

@Injectable({
  providedIn: 'root'
})
export class CheckPermissionGuard implements CanActivate, CanActivateChild {

  constructor(
    private _permissionsService: PermissionsService,
    private router: Router,
  ){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const codModulo = route.data['codModulo']

      return this._permissionsService.getPermissions().pipe(
        map(permissions => {
          const modFound = permissions?.find(per => per.codModulo == codModulo)

          return modFound && modFound.listar || 
                 state.url.indexOf("dashboard/home")? this.router.parseUrl("/") : this.router.parseUrl("dashboard/home")
        })
      )
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const codModulo = route.data['codModulo']


      return this._permissionsService.getPermissions().pipe(
        map(permissions => {
          const modFound      = permissions?.find(per => per.codModulo == codModulo)
          const routeRedirect = this.router.parseUrl("dashboard/home")

          if(!codModulo) return true

          return (modFound && modFound.listar) ?? (routeRedirect)                
        }),
      )
  }
  
}
