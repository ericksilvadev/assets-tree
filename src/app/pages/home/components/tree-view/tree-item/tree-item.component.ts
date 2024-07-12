import { Component, computed, input, InputSignal } from '@angular/core';
import { TreeItemModel } from './models/tree-item.model';
import { IconComponent } from "../../../../../components/icon/icon.component";
import { Status } from '../../../../../models/filter.model';

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.scss'
})
export class TreeItemComponent {
  protected model = input<TreeItemModel>(new TreeItemModel('', '', ''));
  protected indent = input<number>(0);
  protected sensorIconColorClass = computed(() => this.getSendorIconColorClasss());
  protected hasChildren = computed(() => this.model().children.length > 0);

  private getSendorIconColorClasss(): string {
    return this.model().status === Status.Alert ? 'c-red' : 'c-green'
  }
}
