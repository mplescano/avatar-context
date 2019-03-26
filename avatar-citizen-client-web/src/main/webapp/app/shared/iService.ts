import {Observable} from 'rxjs';
import {PageResponse} from './PageResponse';

export interface IService<T> {

    getAll(pageNumber: number, pageSize: number, arrSort: string[]/*["name,direction",]*/): Observable<PageResponse<T[]>>;
}
