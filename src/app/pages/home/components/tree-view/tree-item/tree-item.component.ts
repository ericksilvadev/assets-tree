import { Component, input, InputSignal } from '@angular/core';
import { TreeItemModel } from './models/tree-item.model';

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.scss'
})
export class TreeItemComponent {
  protected model: InputSignal<TreeItemModel> = input<TreeItemModel>(new TreeItemModel('', ''));
}
