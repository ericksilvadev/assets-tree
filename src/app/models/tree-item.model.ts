import { Sensors } from "./sensors.enum";
import { Status } from "./status.enum";
import { TreeItemType } from "./tree-item.enum";

export class TreeItemModel {
  constructor(
    public id: string,
    public name: string,
    public type: TreeItemType,
    public parentId?: string | null,
    public status?: Status | null,
    public sensor?: Sensors | null,
    public children: TreeItemModel[] = [],
    public hasChildren: boolean = false) { }
}