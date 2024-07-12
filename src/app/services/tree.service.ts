import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AssetModel } from '../models/assets.model';
import { LocationModel } from '../models/locations.model';
import { TreeRepository } from '../repositories/tree.repository';
import { AppContextService } from './app-context.service';

@Injectable({
  providedIn: 'root'
})
export class TreeService implements OnDestroy {

  public assets: AssetModel[] = [];
  public locations: LocationModel[] = [];

  private _companyChangeSubscription: Subscription;

  constructor(private treeRepository: TreeRepository, appContext: AppContextService) {
    this._companyChangeSubscription = appContext.currentCompany.subscribe(company => {
      this.setAssetsAndLocations(company.id);
    });
  }

  private setAssetsAndLocations(companyId: string) {
    if (!companyId) return;

    this.setAssets(companyId);
    this.setLocations(companyId);
  }

  private setAssets(companyId: string) {
    this.treeRepository.getAssets(companyId).subscribe(assets => {
      this.assets = assets;
    });
  }

  private setLocations(companyId: string) {
    this.treeRepository.getLocations(companyId).subscribe(locations => {
      this.locations = locations;
    });
  }

  public getAssets(companyId: string): Observable<AssetModel[]> {
    return this.treeRepository.getAssets(companyId);
  }

  public getLocations(companyId: string): Observable<LocationModel[]> {
    return this.treeRepository.getLocations(companyId);
  }

  ngOnDestroy(): void {
    this._companyChangeSubscription.unsubscribe();
  }
}
