import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CitizenService} from '../citizen.service';
import {Citizen} from '../Citizen';
import {first} from 'rxjs/operators';
import {ResponseMessage} from '../../shared/ResponseMessage';
import {AlertService} from '../../shared/alerts/alert.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-citizen-form',
  templateUrl: './citizen-form.component.html',
  styleUrls: ['./citizen-form.component.scss']
})
export class CitizenFormComponent implements OnInit {

  citizen: Citizen;
  titleButton: string;
  titleForm: string;

  constructor(private router: Router,
              private citizenService: CitizenService,
              private route: ActivatedRoute,
              private alertService: AlertService) { }

  ngOnInit() {
    const citizenId: string = this.route.snapshot.paramMap.get('citizenId');
    this.citizen = new Citizen();
    if (citizenId !== null) {
      this.citizenService.getById(Number(citizenId)).pipe(first()).subscribe((citizen: Citizen) => {
        this.citizen = citizen;
      });
      this.titleButton = 'Update';
      this.titleForm = 'Editing Citizen ' + citizenId;
    } else {
      this.titleButton = 'Save';
      this.titleForm = 'New Citizen';
    }
  }

  onSave(citizen: Citizen) {
    // console.log('citizen', citizen);
    if (citizen.id === undefined) {
      this.citizenService.create(citizen).subscribe((responseMessage: ResponseMessage) => {
        this.alertService.sucess(responseMessage.message, true);
        this.router.navigate(['/citizens']);
      }, (httpErrorResponse: HttpErrorResponse) => {
        this.alertService.errorHttpResponse(httpErrorResponse);
      });
    } else {
      this.citizenService.update(citizen).subscribe((responseMessage: ResponseMessage) => {
        this.alertService.sucess(responseMessage.message, true);
        this.router.navigate(['/citizens']);
      }, (httpErrorResponse: HttpErrorResponse) => {
          this.alertService.errorHttpResponse(httpErrorResponse);
      });
    }
  }
  onCancel() {
    this.router.navigate(['/citizens']);
  }

}
