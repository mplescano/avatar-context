import { Injectable } from '@angular/core';
import {Citizen} from './Citizen';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {PageResponse} from '../shared/PageResponse';
import {ResponseMessage} from '../shared/ResponseMessage';
import {IService} from '../shared/iService';

@Injectable({
  providedIn: 'root'
})
export class CitizenService implements IService<Citizen> {

  constructor(private http: HttpClient) { }

  getAll(bodyParams: object, pageNumber: number, pageSize: number, arrSort: string[]/*["name,direction",]*/):
    Observable<PageResponse<Citizen[]>> {
    const params = new HttpParams({ fromObject: {
      'page': pageNumber.toString(),
      'size': pageSize.toString(),
      'sort': arrSort
    }});
    return this.http.get<PageResponse<Citizen[]>>(`${environment.apiUrl}/core/citizens`, {params: params});
  }

  getById(citizenId: number): Observable<Citizen> {
    return this.http.get<Citizen>(`${environment.apiUrl}/core/citizens/${citizenId}`);
  }

  create(citizen: Citizen): Observable<ResponseMessage> {
    return this.http.post<ResponseMessage>(`${environment.apiUrl}/core/citizens`, citizen);
  }

  update(citizen: Citizen): Observable<ResponseMessage> {
    return this.http.put<ResponseMessage>(`${environment.apiUrl}/core/citizens/${citizen.id}`, citizen);
  }

  deleteById(citizenId: number): Observable<ResponseMessage> {
    return this.http.delete<ResponseMessage>(`${environment.apiUrl}/core/citizens/${citizenId}`);
  }

  deleteByIds(citizenIds: number[]): Observable<ResponseMessage> {
    const strCitizenIds = citizenIds.join(',');
    return this.http.delete<ResponseMessage>(`${environment.apiUrl}/core/citizens/${strCitizenIds}`);
  }
}
