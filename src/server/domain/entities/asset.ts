import { Sensors } from "../../../app/models/sensors.enum";
import { Status } from "../../../app/models/status.enum";

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