export enum Sensors {
  Energy = 'energy',
  Vibration = 'vibration',
}

export enum Status {
  Operating = 'operating',
  Alert = 'alert',
}

export class FilterModel {
  constructor(public search: string = '', public sensors: Sensors[] = [], public status: Status[] = []) { }
}