export class LocationEntity {
  constructor(public id: string, public name: string, public parentId: string | null) { }
}