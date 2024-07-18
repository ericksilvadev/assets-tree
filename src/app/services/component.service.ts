import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TreeItemType } from '../pages/home/components/tree-view/tree-item/models/tree-item.enum';
import { TreeItemModel } from '../pages/home/components/tree-view/tree-item/models/tree-item.model';
import { AssetEntity } from '../../server/domain/entities/asset';
import { TreeRepository } from '../repositories/tree.repository';
import { ComponentModel } from '../models/component.model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  public selectedComponent: BehaviorSubject<TreeItemModel> = new BehaviorSubject(new TreeItemModel('', '', TreeItemType.Component));

  constructor(private treeRepository: TreeRepository) { }

  public setSelectedComponent(component: TreeItemModel): void {
    this.selectedComponent.next(component);
  }

  public getComponent(id: string): Observable<ComponentModel> {
    return this.treeRepository.getComponent(id)
  }
}
