import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { Company } from '../../models/company.model';
import { HeaderComponent } from './header.component';
import { AppContextService } from '../../services/app-context.service';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent, HttpClientTestingModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render companies correctly', () => {
    // arrange
    const companies = [
      new Company('1', 'Company 1'),
      new Company('2', 'Company 2')
    ]

    component['companies'] = signal(companies);

    // act
    fixture.detectChanges();
    const companyButtons = fixture.nativeElement.querySelectorAll('nav app-button');

    // assert
    expect(companyButtons[0].innerText).toContain(companies[0].name);
    expect(companyButtons[1].innerText).toContain(companies[1].name);
  });

  it('should set current company when context company changes', () => {
    // arrange
    const company = new Company('1', 'Company 1');
    const contextService = TestBed.inject(AppContextService);
    contextService.currentCompany.next(company);

    // act
    fixture.detectChanges();

    // assert
    expect(component['currentCompany']()).toEqual(company);
  });
});
