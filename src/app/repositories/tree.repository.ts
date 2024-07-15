import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';

@Injectable({
  providedIn: 'root'
})
export class TreeRepository {

  private baseUrl = `${environment.baseBffApiUrl}/companies/662fd0ee639069143a8fc387/tree`;

  constructor(private http: HttpClient) { }

  public getItems(companyId: string): Observable<TreeItemModel[]> {
    return this.http.get<TreeItemModel[]>(`${this.baseUrl}${companyId}/assets`);
  }

}