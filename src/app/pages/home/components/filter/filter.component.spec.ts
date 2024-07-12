import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { FilterService } from '../../../../services/filter.service';
import { FilterModel, Sensors, Status } from '../../../../models/filter.model';

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set energy checked based on filter', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    filterService.filter.next(new FilterModel('', [Sensors.Energy], []));

    // act
    const energyCheckbox = fixture.nativeElement.querySelector('#energy-sensor');
    fixture.detectChanges();

    // assert
    expect(energyCheckbox.checked).toBeTrue();
  });

  it('should add active class to label when energy sensor is checked', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    filterService.filter.next(new FilterModel('', [Sensors.Energy], []));

    // act
    fixture.detectChanges();
    const energyLabel = fixture.nativeElement.querySelector('label[for="energy-sensor"]');

    // assert
    expect(energyLabel.classList.contains('active')).toBeTrue();
  });

  it('should update filter when energy sensor is checked', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    filterService.filter.next(new FilterModel('', [], []));

    // act
    fixture.detectChanges();
    const energyCheckbox = fixture.nativeElement.querySelector('#energy-sensor');
    energyCheckbox.click();

    // assert
    expect(filterService.filter.value.sensors).toEqual([Sensors.Energy]);
  });

  it('should remove energy sensor from filter when energy sensor is unchecked', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    filterService.filter.next(new FilterModel('', [Sensors.Energy], []));

    // act
    fixture.detectChanges();
    const energyCheckbox = fixture.nativeElement.querySelector('#energy-sensor');
    energyCheckbox.click();

    // assert
    expect(filterService.filter.value.sensors).toEqual([]);
  });

  it('should set critical checked based on filter', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    filterService.filter.next(new FilterModel('', [], [Status.Alert]));

    // act
    const criticalCheckbox = fixture.nativeElement.querySelector('#critical-status');
    fixture.detectChanges();

    // assert
    expect(criticalCheckbox.checked).toBeTrue();
  });

  it('should add active class to label when critical status is checked', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    filterService.filter.next(new FilterModel('', [], [Status.Alert]));

    // act
    fixture.detectChanges();
    const criticalLabel = fixture.nativeElement.querySelector('label[for="critical-status"]');

    // assert
    expect(criticalLabel.classList.contains('active')).toBeTrue();
  });

  it('should update filter when critical status is checked', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    filterService.filter.next(new FilterModel('', [], []));

    // act
    fixture.detectChanges();
    const criticalCheckbox = fixture.nativeElement.querySelector('#critical-status');
    criticalCheckbox.click();

    // assert
    expect(filterService.filter.value.status).toEqual([Status.Alert]);
  });

  it('should remove critical status from filter when critical status is unchecked', () => {
    // arrange
    const filterService = TestBed.inject(FilterService);
    filterService.filter.next(new FilterModel('', [], [Status.Alert]));

    // act
    fixture.detectChanges();
    const criticalCheckbox = fixture.nativeElement.querySelector('#critical-status');
    criticalCheckbox.click();

    // assert
    expect(filterService.filter.value.status).toEqual([]);
  });
});
