import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';

@Injectable({
  providedIn: 'root'
})
export class TreeRepository {

  private baseUrl = `${environment.baseBffApiUrl}/companies/`;

  constructor(private http: HttpClient) { }

  public getItems(companyId: string, skip: number = 0, take: number = 5): Observable<TreeItemModel[]> {
    if (!companyId) return of([]);

    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('take', take.toString());

    return this.http.get<TreeItemModel[]>(`${this.baseUrl}${companyId}/tree`, { params });
  }
}