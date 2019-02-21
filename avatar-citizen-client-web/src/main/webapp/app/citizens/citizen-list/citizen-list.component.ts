import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CitizenService} from '../citizen.service';
import {IDatasource} from 'ag-grid-community';
import {first} from 'rxjs/operators';
import {PageResponse} from '../PageResponse';
import {Citizen} from '../Citizen';
import {ResponseMessage} from '../ResponseMessage';
import {AlertService} from '../../alerts/alert.service';

@Component({
  selector: 'app-citizen-list',
  templateUrl: './citizen-list.component.html',
  styleUrls: ['./citizen-list.component.scss']
})
export class CitizenListComponent implements OnInit {

  private gridApi;
  private gridColumnApi;
  columnDefs: object[];

  constructor(private router: Router,
              private citizenService: CitizenService,
              private alertService: AlertService) { }

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

  onDeleteCitizen() {
    const selectedData: object[] = this.getSelectedRows();
    if (selectedData.length === 1) {
      // @ts-ignore
      const citizenId = selectedData[0].id;
      const result = confirm('Desea borrar el registro de id:' + citizenId + '?');
      if (result) {
        this.citizenService.deleteById(citizenId).pipe(first()).subscribe((responseMessage: ResponseMessage) => {
          this.alertService.sucess(responseMessage.message);
          this.gridApi.refreshInfiniteCache();
        });
      }
    }
  }

  onEditCitizen() {
    const selectedData: object[] = this.getSelectedRows();
    if (selectedData.length === 1) {
      // @ts-ignore
      const citizenId = selectedData[0].id;
      this.router.navigate(['/citizens/form/' + citizenId]);
    }
  }

  getSelectedRows(): object[] {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    console.log('selectedData', selectedData);
    // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
    return selectedData;
  }

  onGridReady(eventParams) {
    this.gridApi = eventParams.api;
    this.gridColumnApi = eventParams.columnApi;

    const _superThis = this;
    const dataSource: IDatasource =  {
      getRows: function (params2) {
        // console.log('asking for ' + params2.startRow + ' to ' + params2.endRow);
        _superThis.citizenService.getAll((params2.endRow / eventParams.api.paginationGetPageSize()) - 1,
          eventParams.api.paginationGetPageSize(), []).pipe(first()).subscribe((citizens: PageResponse<Citizen[]>) => {
            params2.successCallback(citizens.content, citizens.totalElements);
          }
        );
      }
    };

    eventParams.api.setDatasource(dataSource);
    eventParams.api.sizeColumnsToFit();
  }
}
