import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertsComponent } from './alerts/alerts.component';
import {UsersModule} from './users/users.module';
import {PartsModule} from './parts/parts.module';
import {AuthModule} from './auth/auth.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule, CollapseModule} from 'ngx-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faHome, faSignOutAlt, faStickyNote, faThList, faUserPlus, faUsers} from '@fortawesome/free-solid-svg-icons';
import {RemindersModule} from './reminders/reminders.module';
import {NgxPermissionsModule} from 'ngx-permissions';

@NgModule({
  declarations: [
    AppComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    UsersModule,
    PartsModule,
    AuthModule,
    RemindersModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faHome);
    library.add(faThList);
    library.add(faStickyNote);
    library.add(faSignOutAlt);
    library.add(faUsers);
    library.add(faUserPlus);
  }
}
