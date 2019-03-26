import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import {AlertService} from './alerts/alert.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import {OneButtonCellRendererComponent} from './grids/OneButtonCellRenderer.component';
import {TwoButtonsCellRendererComponent} from './grids/TwoButtonsCellRenderer.component';

@NgModule({
  declarations: [AlertsComponent, OneButtonCellRendererComponent, TwoButtonsCellRendererComponent],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [
      AlertsComponent, OneButtonCellRendererComponent, TwoButtonsCellRendererComponent
  ],
  providers: [AlertService]
})
export class SharedModule { }
