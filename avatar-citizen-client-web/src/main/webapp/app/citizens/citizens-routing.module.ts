import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CitizenListComponent} from './citizen-list/citizen-list.component';
import {CitizenFormComponent} from './citizen-form/citizen-form.component';

const routes: Routes = [
  {
    path: 'citizens',
    component: CitizenListComponent
  },
  {
    path: 'citizens/form',
    component: CitizenFormComponent
  },
  {
    path: 'citizens/form/:citizenId',
    component: CitizenFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CitizensRoutingModule { }
