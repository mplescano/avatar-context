import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CitizenService} from '../citizen.service';
import {IDatasource} from 'ag-grid-community';
import {first} from 'rxjs/operators';
import {PageResponse} from '../../shared/PageResponse';
import {Citizen} from '../Citizen';
import {ResponseMessage} from '../../shared/ResponseMessage';
import {AlertService} from '../../shared/alerts/alert.service';
import {TwoButtonsCellRendererComponent} from '../../shared/grids/TwoButtonsCellRenderer.component';
import {LoadingOverlayRendererComponent} from '../../shared/grids/LoadingOverlayRenderer.component';
import {NoRowsOverlayRendererComponent} from '../../shared/grids/NoRowsOverlayRenderer.component';
import {HttpErrorResponse} from '@angular/common/http';
import {GridApi} from 'ag-grid-community';
import {GridServiceDatasource} from '../../shared/grids/GridServiceDatasource';

@Component({
  selector: 'app-citizen-list',
  templateUrl: './citizen-list.component.html',
  styleUrls: ['./citizen-list.component.scss']
})
export class CitizenListComponent implements OnInit {

  private gridApi: GridApi;
  private gridColumnApi;
  columnDefs: object[];
  context;
  frameworkComponents;
  overlayLoadingTemplate;
  overlayNoRowsTemplate;

  constructor(private router: Router,
              private citizenService: CitizenService,
              private alertService: AlertService) { }

  ngOnInit() {
    this.columnDefs = [
      {
          headerName: '',
          width: 60,
          checkboxSelection: true
      },
      {
        headerName: 'ID',
        field: 'id',
        width: 60
      },
      {headerName: 'Name', field: 'name' },
      {headerName: 'Planet', field: 'planet'},
      {headerName: 'Gender', field: 'gender'},
      {
        headerName: 'Actions',
        cellRenderer: 'twoButtonsCellRenderer',
        cellRendererParams: {
          button1: {
            label: 'Edit',
            method: 'onRowEditCitizen'
          },
          button2: {
            label: 'Delete',
            method: 'onRowDeleteCitizen'
          }
        }
      }
    ];
    this.context = { componentParent: this };
    this.frameworkComponents = {
      twoButtonsCellRenderer: TwoButtonsCellRendererComponent,
      overlayLoadingTemplate: LoadingOverlayRendererComponent,
      overlayNoRowsTemplate: NoRowsOverlayRendererComponent
    };
    this.overlayLoadingTemplate = 'overlayLoadingTemplate';
    this.overlayNoRowsTemplate = 'overlayNoRowsTemplate';
  }

  onNewCitizen() {
    this.router.navigate(['/citizens/form']);
  }

  onDeleteCitizen() {
    const selectedData: object[] = this.getSelectedRows();

    if (selectedData.length > 0) {
      const citizenIds: number[] = selectedData.map((objItem: Citizen) => objItem.id);
      const result = confirm('Desea borrar estos ' + selectedData.length + ' registros de ids:' + citizenIds.join(',') + '?');
      if (result) {
          this.citizenService.deleteByIds(citizenIds).pipe(first()).subscribe((responseMessage: ResponseMessage) => {
              this.alertService.sucess(responseMessage.message);
              this.gridApi.refreshInfiniteCache();
              this.gridApi.deselectAll();
          }, (httpErrorResponse: HttpErrorResponse) => {
              this.alertService.errorHttpResponse(httpErrorResponse);
          });
      }
    }
  }

  onRowDeleteCitizen(selectedData: object) {
    // @ts-ignore
    const citizenId = selectedData.id;
    const result = confirm('Desea borrar el registro de id:' + citizenId + '?');
    if (result) {
      this.citizenService.deleteById(citizenId).pipe(first()).subscribe((responseMessage: ResponseMessage) => {
        this.alertService.sucess(responseMessage.message);
        this.gridApi.refreshInfiniteCache();
          this.gridApi.deselectAll();
      }, (httpErrorResponse: HttpErrorResponse) => {
          this.alertService.errorHttpResponse(httpErrorResponse);
      });
    }
  }

  onEditCitizen() {
    const selectedData: object[] = this.getSelectedRows();
    if (selectedData.length === 1) {
      this.onRowEditCitizen(selectedData[0]);
    }
  }

  onRowEditCitizen(selectedData: object) {
    // @ts-ignore
    const citizenId = selectedData.id;
    this.router.navigate(['/citizens/form/' + citizenId]);
  }

  getSelectedRows(): object[] {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map( node => node.data );
    // console.log('selectedData', selectedData);
    // const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
    // alert(`Selected nodes: ${selectedDataStringPresentation}`);
    return selectedData;
  }

  onGridReady(eventParams) {
    this.gridApi = eventParams.api;
    this.gridColumnApi = eventParams.columnApi;

    const dataSource = new GridServiceDatasource(this.citizenService, this.gridApi, this.alertService);
    this.gridApi.setDatasource(dataSource);
    // eventParams.api.sizeColumnsToFit();
  }
}
