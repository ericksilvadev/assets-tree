import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { FilterModel, Sensors, Status } from '../models/filter.model';

describe('FilterService', () => {
  let service: FilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set filter', () => {
    // arrange
    const filter = new FilterModel('search', [Sensors.Energy], [Status.Alert]);

    // act
    service.setFilter(filter);

    // assert
    expect(service.filter.value.search).toBe(filter.search);
    expect(service.filter.value.sensors).toEqual(filter.sensors);
    expect(service.filter.value.status).toEqual(filter.status);
  })
});
