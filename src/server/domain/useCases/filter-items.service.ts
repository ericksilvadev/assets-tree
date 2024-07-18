import { FilterModel } from "../../../app/models/filter.model";
import { TreeItemModel } from "../../../app/pages/home/components/tree-view/tree-item/models/tree-item.model";

export class FilterItemsService {
  constructor(private filterModel: FilterModel) { }

  public filter(items: Map<string, TreeItemModel>): Map<string, TreeItemModel> {
    const filteredItems = this.filterItems(items, this.filterBySearch);

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

  private filterItems(items: Map<string, TreeItemModel>, ...filters: ((items: Map<string, TreeItemModel>, filter: FilterModel) => Map<string, TreeItemModel>)[]): Map<string, TreeItemModel> {
    return filters.reduce((acc, filter) => filter(acc, this.filterModel), items);
  }
}