import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CitizensRoutingModule } from './citizens-routing.module';
import { CitizenListComponent } from './citizen-list/citizen-list.component';
import { CitizenFormComponent } from './citizen-form/citizen-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import {CitizenService} from './citizen.service';

@NgModule({
  declarations: [CitizenListComponent, CitizenFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CitizensRoutingModule,
    AgGridModule.withComponents([])
  ],
  providers: [
  ]
})
export class CitizensModule { }
