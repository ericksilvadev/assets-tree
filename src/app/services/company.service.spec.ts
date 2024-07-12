import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Company } from '../models/company.model';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyService } from './company.service';

describe('CompanyService', () => {
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CompanyRepository]
    });
    service = TestBed.inject(CompanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get companies', (done: DoneFn) => {
    // arrange
    const company = new Company('1', 'Company 1');
    spyOn(service['companyRepository'], 'getCompanies').and.returnValue(of([company]));

    // act
    service.getCompanies().subscribe(companies => {
      // assert
      expect(companies.length).toBe(1);
      expect(companies[0].id).toBe(company.id);
      expect(companies[0].name).toBe(company.name);
      done();
    });
  });
});
