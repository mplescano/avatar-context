import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {PartsModule} from './parts/parts.module';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { BsDropdownModule, CollapseModule} from 'ngx-bootstrap';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import {faHome, faStickyNote, faThList, faSpinner} from '@fortawesome/free-solid-svg-icons';
import {faFrown} from '@fortawesome/free-regular-svg-icons';
import {CitizensModule} from './citizens/citizens.module';
import {SharedModule} from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    PartsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CitizensModule,
    AppRoutingModule,
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    library.add(faHome);
    library.add(faThList);
    library.add(faStickyNote);
    library.add(faSpinner);
    library.add(faFrown);
  }
}
