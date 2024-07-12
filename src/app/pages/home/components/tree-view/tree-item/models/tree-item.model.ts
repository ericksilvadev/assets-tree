import { Sensors, Status } from "../../../../../../models/filter.model";

export class TreeItemModel {
  constructor(
    public name: string,
    public icon: string,
    public indent: number = 0,
    public status?: Status,
    public sensor?: Sensors,
    public children: TreeItemModel[] = []) { }
}