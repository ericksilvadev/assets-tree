import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDetailsComponent } from './component-details.component';
import { TreeItemType } from '../tree-view/tree-item/models/tree-item.enum';
import { TreeItemModel } from '../tree-view/tree-item/models/tree-item.model';

describe('ComponentDetailsComponent', () => {
  let component: ComponentDetailsComponent;
  let componentItem: TreeItemModel;
  let fixture: ComponentFixture<ComponentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentDetailsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ComponentDetailsComponent);
    component = fixture.componentInstance;
    componentItem = new TreeItemModel('1', 'Component', TreeItemType.Component, null, null);
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
});
