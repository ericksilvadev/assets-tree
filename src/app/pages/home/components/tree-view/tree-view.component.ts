import { Component } from '@angular/core';
import { SearchFilterComponent } from "../search-filter/search-filter.component";
import { TreeService } from '../../../../services/tree.service';

@Component({
  selector: 'app-tree-view',
  standalone: true,
  imports: [SearchFilterComponent],
  templateUrl: './tree-view.component.html',
  styleUrl: './tree-view.component.scss'
})
export class TreeViewComponent {
  constructor(private treeService: TreeService) { }
}
