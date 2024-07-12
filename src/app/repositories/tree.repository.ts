import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { AssetModel } from '../models/assets.model';
import { LocationModel } from '../models/locations.model';

@Injectable({
  providedIn: 'root'
})
export class TreeRepository {

  private baseUrl = `${environment.baseApiUrl}/companies/`;

  constructor(private http: HttpClient) { }

  public getAssets(companyId: string): Observable<AssetModel[]> {
    return this.http.get<AssetModel[]>(`${this.baseUrl}${companyId}/assets`);
  }

  public getLocations(companyId: string): Observable<LocationModel[]> {
    return this.http.get<AssetModel[]>(`${this.baseUrl}${companyId}/locations`);
  }

}