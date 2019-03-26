import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitizensRoutingModule } from './citizens-routing.module';
import { CitizenListComponent } from './citizen-list/citizen-list.component';
import { CitizenFormComponent } from './citizen-form/citizen-form.component';
import {FormsModule} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import {TwoButtonsCellRendererComponent} from '../shared/grids/TwoButtonsCellRenderer.component';
import {OneButtonCellRendererComponent} from '../shared/grids/OneButtonCellRenderer.component';
import {SharedModule} from '../shared/shared.module';
import {LoadingOverlayRendererComponent} from '../shared/grids/LoadingOverlayRenderer.component';
import {NoRowsOverlayRendererComponent} from '../shared/grids/NoRowsOverlayRenderer.component';

@NgModule({
  declarations: [CitizenListComponent, CitizenFormComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    CitizensRoutingModule,
    AgGridModule.withComponents([OneButtonCellRendererComponent, TwoButtonsCellRendererComponent,
      LoadingOverlayRendererComponent, NoRowsOverlayRendererComponent])
  ],
  providers: [
  ]
})
export class CitizensModule { }
