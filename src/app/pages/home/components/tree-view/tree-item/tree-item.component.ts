import { ChangeDetectionStrategy, Component, computed, input, signal, WritableSignal } from '@angular/core';
import { IconComponent } from "../../../../../components/icon/icon.component";
import { Status } from '../../../../../models/filter.model';
import { TreeService } from '../../../../../services/tree.service';
import { TreeItemType } from './models/tree-item.enum';
import { TreeItemModel } from './models/tree-item.model';

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeItemComponent {
  public model = input<TreeItemModel>(new TreeItemModel('', '', TreeItemType.Location, null, null));

  protected indent = input<number>(0);

  protected sensorIconColorClass = computed(() => this.getSensorIconColorClasss());

  protected children: WritableSignal<TreeItemModel[]> = signal<TreeItemModel[]>([]);

  constructor(private treeService: TreeService) { }

  protected getChildren() {
    if (!this.model().hasChildren || this.children().length) return;

    this.treeService.getChildren(this.model().id)
      .subscribe(children => this.children.set(children));
  }

  private getSensorIconColorClasss(): string {
    return this.model().status === Status.Alert ? 'c-red' : 'c-green'
  }
}
