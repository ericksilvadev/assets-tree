import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDetailsComponent } from './component-details.component';
import { TreeItemType } from '../tree-view/tree-item/models/tree-item.enum';
import { TreeItemModel } from '../tree-view/tree-item/models/tree-item.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentModel } from '../../../../models/component.model';
import { Sensors, SensorsMap } from '../../../../models/sensors.enum';
import { Status, StatusMap } from '../../../../models/status.enum';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { IconComponent } from '../../../../components/icon/icon.component';

describe('ComponentDetailsComponent', () => {
  let component: ComponentDetailsComponent;
  let componentItem: ComponentModel;
  let fixture: ComponentFixture<ComponentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDetailsComponent, HttpClientTestingModule, IconComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComponentDetailsComponent);
    component = fixture.componentInstance;
    componentItem = new ComponentModel('1', 'Component', '1', Status.Operating, Sensors.Energy, '1', '1', '1');
    component['component'].set(componentItem);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display component name', () => {
    // arrange
    const title = fixture.debugElement.nativeElement.querySelector('h1.component-title');

    // assert
    expect(title.textContent).toEqual(componentItem.name);
  });

  it('should get component details when selected component changes', () => {
    // arrange
    const selectedItem = new TreeItemModel('2', 'Component', TreeItemType.Component, '2', Status.Alert, Sensors.Energy);
    const componentDetails = new ComponentModel(selectedItem.id, selectedItem.name, '1', selectedItem.status!, selectedItem.sensor!, '1', selectedItem.parentId!, null);
    const spyGetComponent = spyOn(component['componentService'], 'getComponent').and.returnValue(of(componentDetails));

    // act
    component['componentService'].setSelectedComponent(selectedItem);

    // assert
    expect(spyGetComponent).toHaveBeenCalledWith(selectedItem.id);
    expect(component['component']()).toEqual(componentDetails);
  });

  it('should display component sensor type icon with correct color', () => {
    // arrange
    const sensorIcon = fixture.debugElement.query(By.css('app-icon.sensor-icon'));
    const sensorIconInstance = sensorIcon.componentInstance as IconComponent;
    const sensorIconElement = sensorIcon.nativeElement as HTMLElement;

    // assert
    expect(sensorIconInstance.name()).toBe(SensorsMap[componentItem.sensorType] as string);
    expect(sensorIconElement.classList).toContain(StatusMap[componentItem.status] as string);
  });
});
