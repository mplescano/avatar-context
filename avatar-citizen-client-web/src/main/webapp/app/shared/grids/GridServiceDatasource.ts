import {IDatasource, IGetRowsParams, GridApi} from 'ag-grid-community';
import {IService} from '../iService';
import {first} from 'rxjs/operators';
import {PageResponse} from '../PageResponse';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../alerts/alert.service';

export class GridServiceDatasource<T> implements IDatasource {

    rowCount: number;

    constructor(private service: IService<T>, private gridApi: GridApi, private alertService: AlertService) {
    }

    destroy(): void {
    }

    getRows(params: IGetRowsParams): void {
      // console.log('asking for ', params);
      this.gridApi.showLoadingOverlay();

      const sortModel: {colId, sort}[] = params.sortModel;
      const arrSort: string[] = sortModel.map(objItem => objItem.colId + ',' + objItem.sort);
      const _superThis = this;
      this.service.getAll(null, ((params.endRow / this.gridApi.paginationGetPageSize()) - 1), this.gridApi.paginationGetPageSize(),
        arrSort).pipe(first()).subscribe((pageResponse: PageResponse<T[]>) => {
              params.successCallback(pageResponse.content, pageResponse.totalElements);
              if (pageResponse.totalElements === 0) {
                  _superThis.gridApi.showNoRowsOverlay();
              } else {
                  _superThis.gridApi.hideOverlay();
              }
          }, (httpErrorResponse: HttpErrorResponse) => {
              _superThis.gridApi.hideOverlay();
              _superThis.alertService.errorHttpResponse(httpErrorResponse);
          }
      );
    }
}
