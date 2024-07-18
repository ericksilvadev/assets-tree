import { environment } from '../../environment/environment';
import { AssetEntity } from '../domain/entities/asset';
import { LocationEntity } from '../domain/entities/location';

export class AssetsAndLocationsRepository {
  private baseUrl = environment.baseApiUrl + '/companies';
  constructor() { }

  async getAssets(companyId: string): Promise<AssetEntity[]> {
    const data = (await fetch(`${this.baseUrl}/${companyId}/assets`)).json();
    return data;
  }

  async getLocations(companyId: string): Promise<LocationEntity[]> {
    const data = (await fetch(`${this.baseUrl}/${companyId}/locations`)).json();
    return data;
  }
}