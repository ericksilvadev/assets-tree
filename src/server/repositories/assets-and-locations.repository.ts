import axios from 'axios';
import { environment } from '../../environment/environment';
import { AssetEntity } from '../domain/entities/asset';
import { LocationEntity } from '../domain/entities/location';

export class AssetsAndLocationsRepository {
  private baseUrl = environment.baseApiUrl + '/companies';
  constructor() { }

  async getAssets(companyId: string): Promise<AssetEntity[]> {
    const { data } = await axios.get(`${this.baseUrl}/${companyId}/assets`);
    return data;
  }

  async getLocations(companyId: string): Promise<LocationEntity[]> {
    const { data } = await axios.get(`${this.baseUrl}/${companyId}/locations`);
    return data;
  }
}