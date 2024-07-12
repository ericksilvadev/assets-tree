import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeItemComponent } from './tree-item.component';
import { TreeItemModel } from './models/tree-item.model';
import { Sensors, Status } from '../../../../../models/filter.model';
import { By } from '@angular/platform-browser';
import { IconComponent } from '../../../../../components/icon/icon.component';

describe('TreeItemComponent', () => {
  let component: TreeItemComponent;
  let fixture: ComponentFixture<TreeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TreeItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TreeItemComponent);
    component = fixture.componentInstance;
    const model = new TreeItemModel('1', 'MOTORS H12D - Stage 1', 'component', Status.Alert, Sensors.Energy);
    fixture.componentRef.setInput('model', model);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display item name', () => {
    // assert
    const itemName = fixture.nativeElement.querySelector('.tree-item-name');
    expect(itemName.textContent).toBe(component['model']().name);
  });

  it('should display item icon', () => {
    // assert
    const itemIcon = fixture.debugElement.query(By.css('[data-test-id="item-icon"]')).componentInstance as IconComponent;
    expect(itemIcon.name()).toBe(component['model']().icon);
  });

  it('should display item sensor icon', () => {
    // assert
    const itemIcon = fixture.debugElement.query(By.css('[data-test-id="sensor-icon"]')).componentInstance as IconComponent;
    expect(itemIcon.name()).toBe(component['model']().sensor!);
  });

  it('should not display sensor icon if sensor is not provided', () => {
    // arrange
    const model = new TreeItemModel('1', 'MOTORS H12D - Stage 1', 'component', Status.Alert);
    fixture.componentRef.setInput('model', model);
    fixture.detectChanges();

    // assert
    const itemIcon = fixture.debugElement.query(By.css('[data-test-id="sensor-icon"]'));
    expect(itemIcon).toBeNull();
  });

  it('should set sensor icon red if status is alert', () => {
    // assert
    const itemIcon = fixture.debugElement.query(By.css('[data-test-id="sensor-icon"]')).componentInstance as IconComponent;
    expect(itemIcon.class()).toContain('c-red');
  });

  it('should display arrow if item has children', () => {
    // arrange
    const model = new TreeItemModel('1', 'MOTORS H12D - Stage 1', 'component', Status.Alert, null, [new TreeItemModel('1', 'MOTORS H12D - Stage 1', 'component', Status.Alert)]);
    fixture.componentRef.setInput('model', model);
    fixture.detectChanges();

    // assert
    const arrow = fixture.nativeElement.querySelector('[data-test-id="tree-item-arrow"]');
    expect(arrow).not.toBeNull();
  });

  it('should not display arrow if item has children', () => {
    // assert
    const arrow = fixture.nativeElement.querySelector('[data-test-id="tree-item-arrow"]');
    expect(arrow).toBeNull();
  });

  it('should render children if item has children', () => {
    // arrange
    const child = new TreeItemModel('2', 'MOTORS H12D - Stage 2', 'component', Status.Alert);
    const model = new TreeItemModel('1', 'MOTORS H12D - Stage 1', 'component', Status.Alert, null, [child]);
    fixture.componentRef.setInput('model', model);
    fixture.detectChanges();

    // assert
    const children = fixture.debugElement.queryAll(By.css('app-tree-item'));
    expect(children.length).toBe(1);
    expect(children[0].componentInstance['model']()).toBe(child);
    expect(children[0].componentInstance['indent']()).toBe(1);
  });
});
