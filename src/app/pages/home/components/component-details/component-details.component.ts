import { Component, OnDestroy, signal } from '@angular/core';
import { TreeItemModel } from '../tree-view/tree-item/models/tree-item.model';
import { TreeItemType } from '../tree-view/tree-item/models/tree-item.enum';
import { ComponentService } from '../../../../services/component.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-component-details',
  standalone: true,
  imports: [],
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss'
})
export class ComponentDetailsComponent implements OnDestroy {
  protected component = signal(new TreeItemModel('', '', TreeItemType.Component, null, null));
  private _componentSubscription: Subscription;

  constructor(componentService: ComponentService) {
    this._componentSubscription = componentService.selectedComponent.subscribe((component) => {
      this.component.set(component);
    });
  }

  ngOnDestroy() {
    this._componentSubscription.unsubscribe();
  }
}
