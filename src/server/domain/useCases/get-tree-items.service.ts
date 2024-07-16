import { Sensors, Status } from '../../../app/models/filter.model';
import { TreeItemType } from '../../../app/pages/home/components/tree-view/tree-item/models/tree-item.enum';
import { TreeItemModel } from '../../../app/pages/home/components/tree-view/tree-item/models/tree-item.model';
import { AssetsAndLocationsRepository } from '../../repositories/assets-and-locations.repository';
import { AssetEntity } from '../entities/asset';
import { LocationEntity } from '../entities/location';

export class GetTreeItemsService {
  constructor(private companyRepository: AssetsAndLocationsRepository) { }

  private itemMap = new Map<string, TreeItemModel>();
  private locations: LocationEntity[] = [];
  private assets: AssetEntity[] = [];
  private items: TreeItemModel[] = [];
  private companyId: string = '';

  public async getItems(companyId: string, skip: number = 0, take: number = 5): Promise<TreeItemModel[]> {
    this.assets = await this.getAssets(companyId);
    this.locations = await this.getLocations(companyId);
    this.setup(companyId);

    return this.items.slice(skip, skip + take);
  }

  private async getAssets(companyId: string): Promise<AssetEntity[]> {
    return this.companyRepository.getAssets(companyId);
  }

  private async getLocations(companyId: string): Promise<LocationEntity[]> {
    return this.companyRepository.getLocations(companyId);
  }

  private setup(companyId: string) {
    if (companyId != this.companyId) {
      this.companyId = companyId;
      this.resetItems();
      this.setLocations();
      this.setAssets();
      this.setRoot();
    }
  }

  private resetItems() {
    this.items = [];
    this.itemMap.clear();
  }

  private setLocations(): void {
    for (const location of this.locations) {
      const item = this.getSetItem(location.id, location.name, TreeItemType.Location);
      if (location.parentId) {
        const parent = this.getSetItem(location.parentId, '', TreeItemType.Location);
        parent.children.push(item);
      }
    }
  }

  private setAssets(): void {
    for (const asset of this.assets) {
      const item = this.getSetItem(asset.id, asset.name, this.getAssetType(asset), asset.status, asset.sensorType);

      if (asset.parentId) {
        const parent = this.getSetItem(asset.parentId, '', this.getAssetType(asset));

        parent.children.push(item);
      } else if (asset.locationId) {
        const parent = this.getSetItem(asset.locationId, '', TreeItemType.Location);

        parent.children.push(item);
      }
    }
  }

  private getSetItem(id: string, name: string, type: TreeItemType, status?: Status | null, sensor?: Sensors | null): TreeItemModel {
    if (!this.itemMap.has(id)) {
      this.itemMap.set(id, new TreeItemModel(id, name, type, status, sensor));
    } else {
      this.setItemName(id, name);
    }

    return this.itemMap.get(id)!;
  }

  private setItemName(id: string, name: string): void {
    const item = this.itemMap.get(id);

    if (item && name) {
      item.name = name;
    }
  }

  private getAssetType(asset: AssetEntity): TreeItemType {
    return asset.sensorType ? TreeItemType.Component : TreeItemType.Asset;
  }

  private setRoot(): void {
    this.itemMap.forEach(item => {
      if (this.isRootItem(item)) {
        this.items.push(item);
      }
    });
  }

  private isRootItem(item: TreeItemModel): boolean {
    if (this.isLocation(item)) {
      const location = this.locations.find(location => location.id === item.id);
      const isRootLocation = Boolean(location && !location.parentId);

      return isRootLocation;
    }

    const asset = this.assets.find(asset => asset.id === item.id);
    const isRootAsset = Boolean(asset && asset.parentId && asset.locationId);

    return isRootAsset;
  }

  private isLocation(item: TreeItemModel): boolean {
    return item.type === TreeItemType.Location;
  }
}
