import { Component, OnDestroy, signal } from '@angular/core';
import { TreeItemModel } from '../tree-view/tree-item/models/tree-item.model';
import { TreeItemType } from '../tree-view/tree-item/models/tree-item.enum';
import { ComponentService } from '../../../../services/component.service';
import { Subscription } from 'rxjs';
import { ComponentModel } from '../../../../models/component.model';
import { Sensors } from '../../../../models/sensors.enum';
import { Status } from '../../../../models/status.enum';

@Component({
  selector: 'app-component-details',
  standalone: true,
  imports: [],
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss'
})
export class ComponentDetailsComponent implements OnDestroy {
  protected component = signal(new ComponentModel('1', 'Component', '1', Status.Operating, Sensors.Energy, '1', '1', '1'));
  private _componentSubscription: Subscription;

  constructor(private componentService: ComponentService) {
    this._componentSubscription = componentService.selectedComponent.subscribe((component) => {
      this.setComponent(component);
    });
  }

  private setComponent(component: TreeItemModel): void {
    if (component.type === TreeItemType.Component) {
      this.componentService.getComponent(component.id).subscribe((componentDetails: ComponentModel) => {
        this.component.set(componentDetails);
      });
    }
  }

  ngOnDestroy() {
    this._componentSubscription.unsubscribe();
  }
}
