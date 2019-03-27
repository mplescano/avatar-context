import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from './alert.service';
import {NavigationStart, Router} from '@angular/router';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  messages: any[];

  constructor(private alertService: AlertService, private router: Router) { }

  ngOnInit() {
    this.messages = [];
    this.subscription = this.alertService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
      }
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.messages = this.messages.filter(message => {
          const keepAfterNavigationChange = message.keepAfterNavigationChange;
          if (keepAfterNavigationChange) {
            message.keepAfterNavigationChange = false;
          }
          return keepAfterNavigationChange;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClosed(dismissedMessage: any): void {
    this.messages = this.messages.filter(message => message !== dismissedMessage);
  }
}
