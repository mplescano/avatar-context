import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertsComponent } from './alerts/alerts.component';
import {AlertService} from './alerts/alert.service';
import { AlertModule } from 'ngx-bootstrap/alert';
import {OneButtonCellRendererComponent} from './grids/OneButtonCellRenderer.component';
import {TwoButtonsCellRendererComponent} from './grids/TwoButtonsCellRenderer.component';
import {LoadingOverlayRendererComponent} from './grids/LoadingOverlayRenderer.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {NoRowsOverlayRendererComponent} from './grids/NoRowsOverlayRenderer.component';

@NgModule({
  declarations: [AlertsComponent, OneButtonCellRendererComponent, TwoButtonsCellRendererComponent, LoadingOverlayRendererComponent,
    NoRowsOverlayRendererComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    AlertModule.forRoot()
  ],
  exports: [
      AlertsComponent, OneButtonCellRendererComponent, TwoButtonsCellRendererComponent, LoadingOverlayRendererComponent,
    NoRowsOverlayRendererComponent
  ],
  providers: [AlertService]
})
export class SharedModule { }
