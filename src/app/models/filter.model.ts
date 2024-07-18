export class FilterModel {
  constructor(public search: string = '', public sensors: number = 0, public status: number = 0) { }

  public static fromQueryParams(params: any): FilterModel {
    if (!params) return new FilterModel();

    return new FilterModel(params.search || '', Number(params.sensors) || 0, Number(params.status) || 0);
  }
}