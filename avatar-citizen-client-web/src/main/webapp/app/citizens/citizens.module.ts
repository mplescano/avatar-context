import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitizensRoutingModule } from './citizens-routing.module';
import { CitizenListComponent } from './citizen-list/citizen-list.component';
import { CitizenFormComponent } from './citizen-form/citizen-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import {CitizenService} from './citizen.service';
import {TwoButtonsCellRendererComponent} from './citizen-list/TwoButtonsCellRenderer.component';
import {OneButtonCellRendererComponent} from './citizen-list/OneButtonCellRenderer.component';

@NgModule({
  declarations: [CitizenListComponent, CitizenFormComponent, OneButtonCellRendererComponent, TwoButtonsCellRendererComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CitizensRoutingModule,
    AgGridModule.withComponents([OneButtonCellRendererComponent, TwoButtonsCellRendererComponent])
  ],
  providers: [
  ]
})
export class CitizensModule { }
