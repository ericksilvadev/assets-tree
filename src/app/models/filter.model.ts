export enum Sensors {
  Energy = 1,
  Vibration = 2,
}

export enum Status {
  Operating = 1,
  Alert = 2,
}

export class FilterModel {
  constructor(public search: string = '', public sensors: number = 0, public status: number = 0) { }
}