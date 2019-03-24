import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlertsComponent } from './alerts/alerts.component';
import {PartsModule} from './parts/parts.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AlertModule, BsDropdownModule, CollapseModule} from 'ngx-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faHome, faStickyNote, faThList} from '@fortawesome/free-solid-svg-icons';
import {CitizensModule} from './citizens/citizens.module';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    PartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
    CitizensModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule,
    AlertModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faHome);
    library.add(faThList);
    library.add(faStickyNote);
  }
}
