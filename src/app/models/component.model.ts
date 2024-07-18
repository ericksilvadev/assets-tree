import { AssetEntity } from "../../server/domain/entities/asset";
import { Sensors, SensorsMap } from "./sensors.enum";
import { Status, StatusMap } from "./status.enum";

export class ComponentModel {
  constructor(
    public id: string = '',
    public name: string = '',
    public gatewayId: string = '',
    public status: Status = Status.Operating,
    public sensorType: Sensors = Sensors.Energy,
    public sensorId: string = '',
    public parentId: string | null = null,
    public locationId: string | null = null,
  ) { }

  public static fromEntity(entity: AssetEntity): ComponentModel {
    return new ComponentModel(
      entity.id,
      entity.name,
      entity.gatewayId,
      this.getStatus(entity.status),
      this.getSensorType(entity.sensorType),
      entity.sensorId,
      entity.parentId,
      entity.locationId);
  }

  private static getSensorType(sensor: any): Sensors {
    if (!sensor) {
      return Sensors.Energy;
    }

    return SensorsMap[sensor] as Sensors;
  }

  private static getStatus(status: any): Status {
    if (!status) {
      return Status.Operating;
    }

    return StatusMap[status] as Status;
  }
}