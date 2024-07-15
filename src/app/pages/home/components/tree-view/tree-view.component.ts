import { Component, computed, Signal } from '@angular/core';
import { TreeService } from '../../../../services/tree.service';
import { SearchFilterComponent } from "../search-filter/search-filter.component";
import { TreeItemModel } from './tree-item/models/tree-item.model';
import { TreeItemComponent } from "./tree-item/tree-item.component";

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [SearchFilterComponent, TreeItemComponent],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss'
})
export class TreeViewComponent {
  protected treeItems: Signal<TreeItemModel[]> = computed(this.treeService.items);
  constructor(private treeService: TreeService) { }
}
