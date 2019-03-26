import { ILoadingOverlayAngularComp } from 'ag-grid-angular';
import {Component} from '@angular/core';

@Component({
  selector: 'app-loading-overlay',
  template: `<div class="ag-overlay-loading-wrapper">` +
    `   <fa-icon [icon]="['fas', 'spinner']" [pulse]="true"></fa-icon><span>{{this.loadingMessage}}</span>` +
    `</div>`
})
export class LoadingOverlayRendererComponent implements ILoadingOverlayAngularComp {

  private params: any;

  loadingMessage: string;

  agInit(params): void {
    this.params = params;
    this.loadingMessage = this.processLoadingMessage();
  }

  private processLoadingMessage() {
    if (this.params != null && this.params.loadingMessage !== undefined) {
      return this.params.loadingMessage;
    }
    return 'Loading data, please wait...';
  }
}
