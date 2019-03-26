import {ICellRendererAngularComp} from 'ag-grid-angular';
import {IAfterGuiAttachedParams, ICellRendererParams} from 'ag-grid-community';
import {Component} from '@angular/core';

@Component({
  selector: 'app-two-button-cell',
  template: `<span><button style="height: 20px" (click)="invokeParentMethod1()"
    class="btn-sm btn-info">{{params.colDef.cellRendererParams.button1.label}}</button>&nbsp;<button style="height: 20px"
      (click)="invokeParentMethod2()" class="btn-sm btn-info">{{params.colDef.cellRendererParams.button2.label}}</button></span>`,
  styles: [
    `.btn-sm {
            line-height: 0.5
        }`
  ]
})
export class TwoButtonsCellRendererComponent implements ICellRendererAngularComp {

  public params: ICellRendererParams;

  afterGuiAttached(params?: IAfterGuiAttachedParams): void {
  }

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  public invokeParentMethod1() {
    this.params.context.componentParent[this.params.colDef.cellRendererParams.button1.method](this.params.data);
  }

  public invokeParentMethod2() {
    this.params.context.componentParent[this.params.colDef.cellRendererParams.button2.method](this.params.data);
  }

  refresh(params: any): boolean {
    return false;
  }

}
