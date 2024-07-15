import { Sensors, Status } from "../../../../../../models/filter.model";
import { TreeItemType } from "./tree-item.enum";

export class TreeItemModel {
  constructor(
    public id: string,
    public name: string,
    public type: TreeItemType,
    public status?: Status | null,
    public sensor?: Sensors | null,
    public children: TreeItemModel[] = []) { }
}