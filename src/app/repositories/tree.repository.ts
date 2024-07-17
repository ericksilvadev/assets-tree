import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';
import { FilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class TreeRepository {

  private baseUrl = `${environment.baseBffApiUrl}`;

  constructor(private http: HttpClient) { }

  public getItems(companyId: string, filter: FilterModel = new FilterModel()): Observable<TreeItemModel[]> {
    if (!companyId) return of([]);
    const params = new HttpParams()
      .set('search', filter.search)
      .set('sensors', filter.sensors)
      .set('status', filter.status);

    return this.http.get<TreeItemModel[]>(`${this.baseUrl}/tree/${companyId}`, { params });
  }

  public getChildren(parentId: string): Observable<TreeItemModel[]> {
    if (!parentId) return of([]);

    const params = new HttpParams();

    return this.http.get<TreeItemModel[]>(`${environment.baseBffApiUrl}/children/${parentId}`, { params });
  }
}