export enum Status {
  Operating = 1,
  Alert = 2,
}

export const StatusMap: Record<string, string | Status> = {
  [Status.Operating]: 'operating',
  [Status.Alert]: 'alert',
  'operating': Status.Operating,
  'alert': Status.Alert,
};
