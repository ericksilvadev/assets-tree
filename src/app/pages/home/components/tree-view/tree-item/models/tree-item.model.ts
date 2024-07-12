import { Sensors, Status } from "../../../../../../models/filter.model";

export class TreeItemModel {
  constructor(
    public name: string,
    public icon: string,
    public status?: Status,
    public sensor?: Sensors,
    public children: TreeItemModel[] = []) { }
}