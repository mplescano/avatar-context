import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthUser} from '../../auth/AuthUser';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../auth/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  currentUser: AuthUser;
  currentUserSubscription: Subscription;

  constructor(private authService: AuthenticationService) {
    this.currentUserSubscription = this.authService.currentUserObservable.subscribe(user => {
      console.log('Home user:', user);
      this.currentUser = user;
    });
  }

  ngOnInit() { }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }
}
