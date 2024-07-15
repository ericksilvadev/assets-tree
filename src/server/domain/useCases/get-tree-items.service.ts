import { AssetsAndLocationsRepository } from '../../repositories/assets-and-locations.repository';
import { AssetEntity } from '../entities/asset';
import { LocationEntity } from '../entities/location';

export class GetTreeItemsService {
  constructor(private companyRepository: AssetsAndLocationsRepository) { }

  public async getItems(companyId: string): Promise<any> {
    const assets = await this.getAssets(companyId);
    const locations = await this.getLocations(companyId);

    return [...assets, ...locations];
  }

  public async getAssets(companyId: string): Promise<AssetEntity[]> {
    return this.companyRepository.getAssets(companyId);
  }

  private async getLocations(companyId: string): Promise<LocationEntity[]> {
    return this.companyRepository.getLocations(companyId);
  }
}
