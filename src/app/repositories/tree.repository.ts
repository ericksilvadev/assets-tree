import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssetModel } from '../models/assets.model';

@Injectable({
  providedIn: 'root'
})
export class TreeRepository {
  constructor(private http: HttpClient) { }

  public getAssets(): Observable<AssetModel[]> {
    throw new Error('Method not implemented.');
  }

  public getLocations() {

  }
}