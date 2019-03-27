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

  constructor() {
    this.subject = new Subject<any>();
  }

  sucess(message: string, keepAfterNavigationChange = false) {
    this.subject.next({ type: 'success', text: message, keepAfterNavigationChange: keepAfterNavigationChange});
  }

  error(message: string, keepAfterNavigationChange = false) {
    this.subject.next({ type: 'danger', text: message, keepAfterNavigationChange: keepAfterNavigationChange});
  }

  errorHttpResponse(httpErrorResponse: HttpErrorResponse, keepAfterNavigationChange = false) {
    // console.log('httpErrorResponse', httpErrorResponse);
    // console.log('responseErrorMessage', httpErrorResponse.error);
    if (httpErrorResponse.error !== null && httpErrorResponse.error.code !== undefined && httpErrorResponse.error.message !== undefined) {
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
    } else {
        const message = '[' + httpErrorResponse.name + '] ' + httpErrorResponse.message;
        this.error(message, keepAfterNavigationChange);
    }
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
