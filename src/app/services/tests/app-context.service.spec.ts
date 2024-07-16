import { TestBed } from '@angular/core/testing';

import { ActivatedRoute, convertToParamMap, ParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Company } from '../../models/company.model';
import { AppContextService } from '../app-context.service';

describe('AppContextService', () => {
  let service: AppContextService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppContextService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set current company', () => {
    // arrange
    const company = new Company('1', 'Company 1');

    // act
    service.setCurrentCompany(company);

    // assert
    expect(service.currentCompany.value).toEqual(company);
  });

  it('navigate when set current company', () => {
    // arrange
    const company = new Company('1', 'Company 1');
    const navigateSpy = spyOn(service['router'], 'navigate').and.callThrough();

    // act
    service.setCurrentCompany(company);

    // assert
    expect(navigateSpy).toHaveBeenCalledWith(['company', company.id]);
  });
});
