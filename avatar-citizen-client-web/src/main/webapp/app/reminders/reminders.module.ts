import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReminderListComponent } from './reminder-list/reminder-list.component';
import { ReminderFormComponent } from './reminder-form/reminder-form.component';
import {RemindersRoutingModule} from './reminders-routing.module';

@NgModule({
  declarations: [ReminderListComponent, ReminderFormComponent],
  imports: [
    CommonModule,
    RemindersRoutingModule
  ]
})
export class RemindersModule { }
