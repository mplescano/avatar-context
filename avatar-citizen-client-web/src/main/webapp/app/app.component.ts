import {Component, OnInit} from '@angular/core';
import {AuthUser} from './auth/AuthUser';
import {AuthenticationService} from './auth/authentication.service';
import {Router} from '@angular/router';
import {NgxPermissionsService, NgxRolesService} from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) {
  }


  ngOnInit(): void {
  }

}
