import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Permiso } from 'src/app/Models/Permisos';
import { PermissionsService } from './permissions.service';

@Directive({
  selector: '[canPermission]'
})
export class CanPermissionDirective {
  
  private permissionsCurrent!: { codModulo: string, permiso: string };

  @Input() 
  set canPermission(values: { codModulo: string, permiso: string }) {
    
    this.permissionsCurrent = values

    this._permissionsService.permissions$.subscribe(
      (permissions: Permiso[]) => {
        this.updateView(permissions);
      }
    )

  }

  constructor(
    private _permissionsService: PermissionsService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {

  }

  updateView(permissions: Permiso[]){
    const modFound = permissions?.find(per => per.codModulo = this.permissionsCurrent.codModulo)

    if(modFound && modFound[this.permissionsCurrent.permiso]){
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

}
