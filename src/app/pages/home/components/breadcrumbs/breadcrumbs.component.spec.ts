import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbsComponent } from './breadcrumbs.component';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadcrumbsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display breadcrumbs correctly', () => {
    // arrange
    fixture.componentRef.setInput('breadcrumbs', ['Home', 'Products', 'Product 1']);

    // act
    fixture.detectChanges();
    const breadcrumbs = fixture.nativeElement.querySelectorAll('.breadcrumb');

    // assert
    expect(breadcrumbs.length).toBe(3);
    expect(breadcrumbs[0].innerText).toContain('Home');
    expect(breadcrumbs[1].innerText).toContain('Products');
    expect(breadcrumbs[2].innerText).toContain('Product 1');
  });
});
