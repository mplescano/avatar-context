import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CitizenService} from '../citizen.service';
import {Citizen} from '../Citizen';
import {first} from 'rxjs/operators';

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
              private route: ActivatedRoute) { }

  ngOnInit() {
    const citizenId: string = this.route.snapshot.paramMap.get('citizenId');
    if (citizenId !== null) {
      this.citizenService.getById(Number(citizenId)).pipe(first()).subscribe((citizen: Citizen) => {
        this.citizen = citizen;
      });
      this.titleButton = 'Update';
      this.titleForm = 'Editing Citizen ' + citizenId;
    } else {
      this.titleButton = 'Save';
      this.titleForm = 'New Citizen';
      this.citizen = new Citizen();
    }
  }

  onSave() {

  }

  onCancel() {
    this.router.navigate(['/citizens']);
  }

}
