import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { FilterService } from '../../../../../services/filter.service';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let component: SearchFilterComponent;
  let fixture: ComponentFixture<SearchFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchFilterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize search with filter service search value', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    const value = 'search value';
    filterService.setSearchFilter(value);

    // act
    fixture.detectChanges();
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    // assert
    expect(input.value).toBe(value);
  });

  it('should set search filter on input', fakeAsync(() => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    const value = 'search value';
    const DEBOUNCE_TIME = 300;
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    input.value = value;
    spyOn(filterService, 'setSearchFilter');

    // act
    input.dispatchEvent(new Event('input'));
    tick(DEBOUNCE_TIME);

    // assert
    expect(filterService.setSearchFilter).toHaveBeenCalledWith(value);
  }));

  it('should focus on input on button click', () => {
    // arrange
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const input = fixture.nativeElement.querySelector('input') as HTMLInputElement;
    spyOn(input, 'focus');

    // act
    button.click();

    // assert
    expect(input.focus).toHaveBeenCalled();
  });
});
