import { AssetEntity } from "../../server/domain/entities/asset";
import { Sensors } from "./sensors.enum";
import { Status } from "./status.enum";

export class ComponentModel {
  constructor(
    public id: string = '',
    public name: string = '',
    public gatewayId: string = '',
    public status: Status = Status.Operating,
    public sensorType: Sensors = Sensors.Energy,
    public sensorId: string = '',
    public parentId: string | null,
    public locationId: string | null,
  ) { }

  public static fromEntity(entity: AssetEntity): ComponentModel {
    return new ComponentModel(
      entity.id,
      entity.name,
      entity.gatewayId,
      entity.status ?? Status.Operating,
      entity.sensorType ?? Sensors.Energy,
      entity.sensorId,
      entity.parentId,
      entity.locationId);
  }
}