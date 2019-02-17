import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReminderListComponent} from './reminder-list/reminder-list.component';
import {SessguardService} from '../auth/sessguard.service';
import {ReminderFormComponent} from './reminder-form/reminder-form.component';

const remindersRoutes: Routes = [
  {
    path: 'reminders',
    component: ReminderListComponent,
    canActivate: [
      SessguardService
    ]
  },
  {
    path: 'reminders/form',
    component: ReminderFormComponent,
    canActivate: [
      SessguardService
    ]
  },
  {
    path: 'reminders/form/:id',
    component: ReminderFormComponent,
    canActivate: [
      SessguardService
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(remindersRoutes)],
  exports: [RouterModule]
})
export class RemindersRoutingModule {
}
