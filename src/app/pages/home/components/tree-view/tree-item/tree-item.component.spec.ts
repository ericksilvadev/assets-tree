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
    const model = new TreeItemModel('MOTORS H12D - Stage 1', 'component', 0, Status.Alert, Sensors.Energy);
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
    const itemIcon = fixture.debugElement.query(By.css('app-icon')).componentInstance as IconComponent;
    expect(itemIcon.name).toBe(component['model']().icon);
  });
});
