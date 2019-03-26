import { INoRowsOverlayAngularComp } from 'ag-grid-angular';
import {Component} from '@angular/core';

@Component({
  selector: 'app-no-rows-overlay',
  template: `<div class="ag-overlay-loading-wrapper">` +
    `   <fa-icon [icon]="['far', 'frown']"></fa-icon><span> {{this.noRowsMessage}} </span>` +
    `</div>`
})
export class NoRowsOverlayRendererComponent implements INoRowsOverlayAngularComp {

  private params: any;
  noRowsMessage: string;

  agInit(params): void {
    this.params = params;
    this.noRowsMessage = this.processNoRowsMessage();
  }

  private processNoRowsMessage() {
    if (this.params != null && this.params.noRowsMessage !== undefined) {
      return this.params.noRowsMessage;
    }
    return 'There are no data.';
  }
}
