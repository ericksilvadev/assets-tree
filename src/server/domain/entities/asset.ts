import { Sensors, Status } from "../../../app/models/filter.model";

export class AssetEntity {
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