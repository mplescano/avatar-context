import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UsersModule} from '../users/users.module';
import {AuthModule} from '../auth/auth.module';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersModule,
    AuthModule,
    RouterModule
  ]
})
export class PartsModule { }
