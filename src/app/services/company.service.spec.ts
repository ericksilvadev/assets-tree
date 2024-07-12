import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Company } from '../models/company.model';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyService } from './company.service';
import { Injector, runInInjectionContext } from '@angular/core';
import { AppContextService } from './app-context.service';

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

  it('should set companies', (done: DoneFn) => {
    // arrange
    const company = new Company('1', 'Company 1');
    spyOn(service['companyRepository'], 'getCompanies').and.returnValue(of([company]));

    // act
    runInInjectionContext(TestBed.inject(Injector), () => {
      service.setCompanies()
    });
    // assert
    expect(service.companies().length).toBe(1);
    expect(service.companies()[0].id).toBe(company.id);
    expect(service.companies()[0].name).toBe(company.name);
    done();
  });

  it('should set context company if not set', () => {
    // arrange
    const company = new Company('1', 'Company 1');
    const context = TestBed.inject(AppContextService);
    context.currentCompany.next(new Company('', ''));

    spyOn(service['companyRepository'], 'getCompanies').and.returnValue(of([company]));

    // act
    runInInjectionContext(TestBed.inject(Injector), () => {
      service.setCompanies()
    });

    // assert
    expect(context.currentCompany.value.id).toBe(company.id);
    expect(context.currentCompany.value.name).toBe(company.name);
  });

  it('should not set context company if already set', () => {
    // arrange
    const company = new Company('1', 'Company 1');
    const contextCompany = new Company('2', 'Company 2');
    const context = TestBed.inject(AppContextService);
    context.currentCompany.next(contextCompany);

    spyOn(service['companyRepository'], 'getCompanies').and.returnValue(of([company]));

    // act
    runInInjectionContext(TestBed.inject(Injector), () => {
      service.setCompanies()
    });

    // assert
    expect(context.currentCompany.value.id).toBe(contextCompany.id);
    expect(context.currentCompany.value.name).toBe(contextCompany.name);
  });
});
