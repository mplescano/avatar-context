import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AlertService} from './alert.service';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  messages: any[];

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.messages = [];
    this.subscription = this.alertService.getMessage().subscribe(message => {
      if (message) {
        this.messages.push(message);
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
