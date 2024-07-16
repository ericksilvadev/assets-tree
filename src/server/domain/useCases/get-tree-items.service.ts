import { FilterModel, Sensors, Status } from '../../../app/models/filter.model';
import { TreeItemType } from '../../../app/pages/home/components/tree-view/tree-item/models/tree-item.enum';
import { TreeItemModel } from '../../../app/pages/home/components/tree-view/tree-item/models/tree-item.model';
import { AssetsAndLocationsRepository } from '../../repositories/assets-and-locations.repository';
import { AssetEntity } from '../entities/asset';
import { LocationEntity } from '../entities/location';

export class GetTreeItemsService {
  constructor(private companyRepository: AssetsAndLocationsRepository) { }

  private itemMap = new Map<string, TreeItemModel>();
  private parentIds = new Set<string>();
  private locations: LocationEntity[] = [];
  private assets: AssetEntity[] = [];
  private items: TreeItemModel[] = [];
  private companyId: string = '';

  public async getItems(companyId: string, skip: number = 0, take: number = 30, filter: FilterModel = new FilterModel()): Promise<TreeItemModel[]> {
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
      this.getSetItem(location.id, location.name, TreeItemType.Location, location.parentId);
      this.parentIds.add(location.parentId || '');
    }
  }

  private setAssets(): void {
    for (const asset of this.assets) {
      this.getSetItem(asset.id, asset.name, this.getAssetType(asset), asset.parentId || asset.locationId, asset.status, asset.sensorType);
      this.parentIds.add(asset.parentId || asset.locationId || '');
    }
  }

  private getSetItem(id: string, name: string, type: TreeItemType, parentId?: string | null, status?: Status | null, sensor?: Sensors | null) {
    if (!this.itemMap.has(id)) {
      this.itemMap.set(id, new TreeItemModel(id, name, type, parentId, status, sensor));
    }
  }

  private getAssetType(asset: AssetEntity): TreeItemType {
    return asset.sensorType ? TreeItemType.Component : TreeItemType.Asset;
  }

  private setRoot(): void {
    this.itemMap.forEach(item => {
      if (this.isRootItem(item)) {
        item.hasChildren = this.parentIds.has(item.id);
        this.items.push(item);
      }
    });
  }

  private isRootItem(item: TreeItemModel): boolean {
    return !this.itemMap.get(item.id)?.parentId;
  }

  public getChildren(parentId: string): TreeItemModel[] {
    const children: TreeItemModel[] = [];

    for (let item of this.itemMap.values()) {
      if (item.parentId === parentId) {
        item.hasChildren = this.parentIds.has(item.id);
        children.push(item);
      }
    }

    return children;
  }
}
