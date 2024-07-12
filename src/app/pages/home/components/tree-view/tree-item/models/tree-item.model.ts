import { Sensors, Status } from "../../../../../../models/filter.model";

export class TreeItemModel {
  constructor(
    public id: string,
    public name: string,
    public icon: string,
    public status?: Status | null,
    public sensor?: Sensors | null,
    public children: TreeItemModel[] = []) { }
}