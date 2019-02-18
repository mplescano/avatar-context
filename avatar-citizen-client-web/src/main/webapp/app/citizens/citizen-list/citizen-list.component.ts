import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CitizenService} from '../citizen.service';
import {IDatasource} from 'ag-grid-community';
import {first} from 'rxjs/operators';
import {PageResponse} from '../PageResponse';
import {Citizen} from '../Citizen';

@Component({
  selector: 'app-citizen-list',
  templateUrl: './citizen-list.component.html',
  styleUrls: ['./citizen-list.component.scss']
})
export class CitizenListComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  private columnDefs: object[];

  constructor(private router: Router, private citizenService: CitizenService) { }

  ngOnInit() {
    this.columnDefs = [
      {headerName: 'ID', field: 'id' },
      {headerName: 'Name', field: 'name' },
      {headerName: 'Planet', field: 'planet'},
      {headerName: 'Gender', field: 'gender'}
    ];
  }

  onNewCitizen() {
    this.router.navigate(['/citizens/form']);
  }

  onDeleteCitizens() {

  }

  onEditCitizen(citizenId: number) {

  }

  onGridReady(eventParams) {
    this.gridApi = eventParams.api;
    this.gridColumnApi = eventParams.columnApi;

    const _superThis = this;
    const dataSource: IDatasource =  {
      getRows: function (params2) {
        console.log('asking for ' + params2.startRow + ' to ' + params2.endRow);
        _superThis.citizenService.getAll((params2.endRow / eventParams.api.paginationGetPageSize()) - 1,
          eventParams.api.paginationGetPageSize(), []).pipe(first()).subscribe((citizens: PageResponse<Citizen[]>) => {
            params2.successCallback(citizens.content, citizens.totalElements);
          }
        );
      }
    };

    eventParams.api.setDatasource(dataSource);

  }
}
