import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanPermissionDirective } from './can-permission.directive';
import { CheckPermissionGuard } from './permissions.guard';
import { CanVerificationDirective } from './can-verification.directive';
import { PermissionsService } from './permissions.service';


@NgModule({
  declarations: [
    CanPermissionDirective,
    CanVerificationDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CanPermissionDirective,
    CanVerificationDirective
  ],
  providers: [
    CheckPermissionGuard,
    PermissionsService
  ]
})
export class PermissionsHandlerModule { }
