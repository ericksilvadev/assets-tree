import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environment/environment';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';

@Injectable({
  providedIn: 'root'
})
export class TreeRepository {

  private baseUrl = `${environment.baseBffApiUrl}`;

  constructor(private http: HttpClient) { }

  public getItems(companyId: string, skip: number = 0, take: number = 30): Observable<TreeItemModel[]> {
    if (!companyId) return of([]);

    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('take', take.toString());

    return this.http.get<TreeItemModel[]>(`${this.baseUrl}/tree/${companyId}`, { params });
  }

  public getChildren(parentId: string, skip: number = 0, take: number = 30): Observable<TreeItemModel[]> {
    if (!parentId) return of([]);

    const params = new HttpParams()
      .set('skip', skip.toString())
      .set('take', take.toString());

    return this.http.get<TreeItemModel[]>(`${environment.baseBffApiUrl}/children/${parentId}`, { params });
  }
}