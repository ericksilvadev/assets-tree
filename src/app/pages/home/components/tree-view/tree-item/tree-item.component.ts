import { Component, input, InputSignal } from '@angular/core';
import { TreeItemModel } from './models/tree-item.model';
import { IconComponent } from "../../../../../components/icon/icon.component";

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.scss'
})
export class TreeItemComponent {
  protected model: InputSignal<TreeItemModel> = input<TreeItemModel>(new TreeItemModel('', ''));
}
