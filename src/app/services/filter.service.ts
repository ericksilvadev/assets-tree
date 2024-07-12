import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FilterModel } from '../models/filter.model';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  public filter: BehaviorSubject<FilterModel> = new BehaviorSubject(new FilterModel());

  constructor() { }

  public setFilter(filter: FilterModel) {
    this.filter.next(filter);
  }
}
