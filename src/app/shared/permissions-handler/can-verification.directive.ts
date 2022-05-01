import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { PawwowService } from '../../services/pawwow.service';

@Directive({
  selector: '[canVerification]'
})
export class CanVerificationDirective {
  
  private canVerify!: boolean;

  @Input() 
  set canVerification(value: boolean) {
    this.canVerify = value
    this.updateView();
  }

  constructor(
    private _pawwowService: PawwowService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {

  }

  updateView(){
    if(this._pawwowService.user_data.verificador == this.canVerify){
      this.viewContainer.createEmbeddedView(this.templateRef)
    }
  }

}
