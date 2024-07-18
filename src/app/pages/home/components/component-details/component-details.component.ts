import { Component, computed, OnDestroy, signal } from '@angular/core';
import { TreeItemModel } from '../tree-view/tree-item/models/tree-item.model';
import { TreeItemType } from '../tree-view/tree-item/models/tree-item.enum';
import { ComponentService } from '../../../../services/component.service';
import { Subscription } from 'rxjs';
import { ComponentModel } from '../../../../models/component.model';
import { Sensors, SensorsMap } from '../../../../models/sensors.enum';
import { Status, StatusMap } from '../../../../models/status.enum';
import { IconComponent } from "../../../../components/icon/icon.component";
import { AvatarComponent } from "../../../../components/avatar/avatar.component";

@Component({
  selector: 'app-component-details',
  standalone: true,
  imports: [IconComponent, AvatarComponent],
  templateUrl: './component-details.component.html',
  styleUrl: './component-details.component.scss'
})
export class ComponentDetailsComponent implements OnDestroy {
  protected component = signal(new ComponentModel('1', 'Component', '1', Status.Operating, Sensors.Energy, '1', '1', '1'));
  protected sensorIcon = computed(() => SensorsMap[this.component().sensorType] as string);
  protected sensorStatusIcon = computed(() => this.component().sensorType == Sensors.Energy ? 'bolt' : 'circle');
  protected statusColorClass = computed(() => StatusMap[this.component().status] as string);

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
