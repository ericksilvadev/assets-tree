import { Sensors, Status } from "./filter.model";

export class AssetModel {
  constructor(
    public id: string,
    public name: string,
    public locationId: string | null,
    public parentId: string | null,
    public sensorType: Sensors | null,
    public status: Status | null,
    public sensorId?: string,
    public gatewayId?: string) { }
}