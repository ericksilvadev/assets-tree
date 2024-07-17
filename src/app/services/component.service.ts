import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TreeItemType } from '../pages/home/components/tree-view/tree-item/models/tree-item.enum';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  public selectedComponent: BehaviorSubject<TreeItemModel> = new BehaviorSubject(new TreeItemModel('', '', TreeItemType.Component));

  constructor() { }

  public setSelectedComponent(component: TreeItemModel): void {
    this.selectedComponent.next(component);
  }
}
