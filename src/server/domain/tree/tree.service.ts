import { ComponentModel } from '../../../app/models/component.model';
import { FilterModel } from '../../../app/models/filter.model';
import { Sensors, SensorsMap } from '../../../app/models/sensors.enum';
import { Status, StatusMap } from '../../../app/models/status.enum';
import { TreeItemType } from '../../../app/pages/home/components/tree-view/tree-item/models/tree-item.enum';
import { TreeItemModel } from '../../../app/pages/home/components/tree-view/tree-item/models/tree-item.model';
import { AssetsAndLocationsRepository } from '../../repositories/assets-and-locations.repository';
import { AssetEntity } from '../entities/asset';
import { LocationEntity } from '../entities/location';
import { FilterItemsService } from './filter-items.service';

export class TreeService {

  private locations: LocationEntity[] = [];
  private assets: AssetEntity[] = [];
  private items: TreeItemModel[] = [];
  private parents = new Set<string>();
  private itemMap = new Map<string, TreeItemModel>();
  private assetsMap = new Map<string, AssetEntity>();
  private filteredItemMap = new Map<string, TreeItemModel>();
  private filterService: FilterItemsService = new FilterItemsService(new FilterModel());
  private companyId: string = '';

  constructor(private companyRepository: AssetsAndLocationsRepository) { }

  public async getItems(companyId: string, filter: FilterModel = new FilterModel()): Promise<TreeItemModel[]> {
    this.filterService = new FilterItemsService(filter);
    this.assets = await this.getAssets(companyId);
    this.locations = await this.getLocations(companyId);
    this.setup(companyId);

    return this.items;
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
    }

    this.setFilteredItems();
    this.setRoot();
  }

  private resetItems() {
    this.items = [];
    this.itemMap.clear();
  }

  private setLocations(): void {
    for (const location of this.locations) {
      this.getSetItem(location.id, location.name, TreeItemType.Location, location.parentId);
      this.parents.add(location.parentId || '');
    }
  }

  private setAssets(): void {
    for (const asset of this.assets) {
      this.assetsMap.set(asset.id, asset);
      this.getSetItem(asset.id, asset.name, this.getAssetType(asset), asset.parentId || asset.locationId, this.getAssetStatus(asset), this.getAssetSensor(asset));
      this.parents.add(asset.parentId || asset.locationId || '');
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

  private getAssetStatus(asset: AssetEntity): Status | null {
    if (!asset.status) {
      return null;
    }

    return StatusMap[asset.status] as Status;
  }

  private getAssetSensor(asset: AssetEntity): Sensors | null {
    if (!asset.sensorType) {
      return null;
    }

    return SensorsMap[asset.sensorType] as Sensors;
  }

  private setRoot(): void {
    if (this.itemMap.size === this.filteredItemMap.size) {
      this.setDefaultRoot();
    } else {
      this.setFilteredRoot();
    }
  }

  private setDefaultRoot() {
    this.items = [];

    this.itemMap.forEach(item => {
      if (!item.parentId) {
        item.hasChildren = this.itemHasChildren(item);
        this.items.push(item);
      }
    });
  }

  private setFilteredRoot() {
    this.items = [];

    this.itemMap.forEach(item => {
      if (this.isFilteredItemOrParent(item) && !item.parentId) {
        item.hasChildren = this.itemHasChildren(item);
        this.items.push(item);
      }
    });
  }

  private isFilteredItemOrParent(item: TreeItemModel): boolean {
    let hasFilteredChild = false;

    if (this.filteredItemMap.has(item.id)) return true;

    if (this.itemHasChildren(item)) {
      for (let child of this.getChildren(item.id)) {
        if (this.isFilteredItemOrParent(child)) {
          hasFilteredChild = true;
          break;
        }
      }
    }

    return hasFilteredChild;
  }

  public getChildren(parentId: string): TreeItemModel[] {
    const children: TreeItemModel[] = [];

    for (let item of this.itemMap.values()) {
      if (item.parentId === parentId) {
        item.hasChildren = this.itemHasChildren(item);
        children.push(item);
      }
    }

    return children;
  }

  private itemHasChildren(item: TreeItemModel): boolean {
    return this.parents.has(item.id);
  }

  private setFilteredItems(): void {
    this.filteredItemMap = this.filterService.filter(this.itemMap);
  }

  public getComponent(id: string): ComponentModel | undefined {
    const asset = this.getAsset(id);

    if (!asset)
      return;

    return ComponentModel.fromEntity(asset);
  }

  private getAsset(id: string): AssetEntity | undefined {
    return this.assetsMap.get(id);
  }
}
