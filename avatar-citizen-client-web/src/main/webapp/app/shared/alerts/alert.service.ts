import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {ResponseErrorMessage} from '../ResponseErrorMessage';
import {ErrorDetail} from '../ErrorDetail';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private subject: Subject<any>;
  private keepAfterNavigationChange: boolean;

  constructor(private router: Router) {
    this.subject = new Subject<any>();
    this.keepAfterNavigationChange = false;

    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }

  sucess(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'success', text: message});
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({ type: 'danger', text: message});
  }

  errorHttpResponse(httpErrorResponse: HttpErrorResponse, keepAfterNavigationChange = false) {
    const responseErrorMessage: ResponseErrorMessage = httpErrorResponse.error;
    let message = '[' + responseErrorMessage.code + '] ' + responseErrorMessage.message + '<br>';
    if (responseErrorMessage.data != null) {
      message = message + '<ul>';
      const arrErrorDetails: ErrorDetail[] = responseErrorMessage.data;
      arrErrorDetails.forEach((errorDetail: ErrorDetail, index) => {
        message = message + '<li>';
        message = message + errorDetail.code + ' ' + errorDetail.message;
        message = message + '</li>';
      });
    }
    message = message + '</ul>';
    this.error(message, keepAfterNavigationChange);
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
