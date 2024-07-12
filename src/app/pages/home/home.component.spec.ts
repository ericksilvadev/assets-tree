import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { AppContextService } from '../../services/app-context.service';
import { Company } from '../../models/company.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show current company on breadcrumbs path', () => {
    // arrange
    const company = new Company('1', 'Company 1');
    const contextService = TestBed.inject(AppContextService);
    contextService.currentCompany.next(company);

    // act
    fixture.detectChanges();
    const breadcrumbs = fixture.nativeElement.querySelector('app-breadcrumbs');

    // assert
    expect(breadcrumbs.innerText).toContain(company.name);
  });
});
