import { FilterModel } from "../../../app/models/filter.model";
import { TreeItemModel } from "../../../app/models/tree-item.model";

export class FilterItemsService {
  constructor(private filterModel: FilterModel) { }

  public filter(items: Map<string, TreeItemModel>): Map<string, TreeItemModel> {
    const filteredItems = this.filterItems(items, this.filterBySearch, this.filterBySensors, this.filterByStatus);

    return filteredItems;
  }

  private filterBySearch(items: Map<string, TreeItemModel>, filter: FilterModel): Map<string, TreeItemModel> {
    const filteredItems = new Map<string, TreeItemModel>();

    if (!filter.search) return items;

    for (let item of items.values()) {
      if (item.name.toLowerCase().includes(filter.search.toLowerCase())) {
        filteredItems.set(item.id, item);
      }
    }

    return filteredItems;
  }

  private filterBySensors(items: Map<string, TreeItemModel>, filter: FilterModel): Map<string, TreeItemModel> {
    const filteredItems = new Map<string, TreeItemModel>();

    if (!filter.sensors) return items;

    for (let item of items.values()) {
      if (Boolean((item.sensor || 0) & filter.sensors)) {
        filteredItems.set(item.id, item);
      }
    }

    return filteredItems;
  }

  private filterByStatus(items: Map<string, TreeItemModel>, filter: FilterModel): Map<string, TreeItemModel> {
    const filteredItems = new Map<string, TreeItemModel>();

    if (!filter.status) return items;

    for (let item of items.values()) {
      if (Boolean((item.status || 0) & filter.status)) {
        filteredItems.set(item.id, item);
      }
    }

    return filteredItems;
  }

  private filterItems(items: Map<string, TreeItemModel>, ...filters: ((items: Map<string, TreeItemModel>, filter: FilterModel) => Map<string, TreeItemModel>)[]): Map<string, TreeItemModel> {
    return filters.reduce((acc, filter) => filter(acc, this.filterModel), items);
  }
}