export enum Sensors {
  Energy = 1,
  Vibration = 2,
}

export const SensorsMap: Record<string, string | Sensors> = {
  [Sensors.Energy]: 'energy',
  [Sensors.Vibration]: 'vibration',
  'energy': Sensors.Energy,
  'vibration': Sensors.Vibration,
};