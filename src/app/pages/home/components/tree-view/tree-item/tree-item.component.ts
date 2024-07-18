import { ChangeDetectionStrategy, Component, computed, input, signal, WritableSignal } from '@angular/core';
import { IconComponent } from "../../../../../components/icon/icon.component";
import { Sensors } from '../../../../../models/sensors.enum';
import { Status } from '../../../../../models/status.enum';
import { TreeService } from '../../../../../services/tree.service';
import { TreeItemType } from './models/tree-item.enum';
import { TreeItemModel } from './models/tree-item.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentService } from '../../../../../services/component.service';

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

  protected sensorIcon = computed(() => this.getSensorIconName());

  protected children: WritableSignal<TreeItemModel[]> = signal<TreeItemModel[]>([]);

  constructor(private treeService: TreeService, private router: Router, private activatedRoute: ActivatedRoute, private componentService: ComponentService) { }

  private getSensorIconColorClasss(): string {
    return this.model().status === Status.Alert ? 'sensor-alert' : 'sensor-normal';
  }

  private getSensorIconName(): string {
    return this.model().sensor == Sensors.Energy ? 'bolt' : 'circle';
  }

  protected onSummaryClick() {
    this.getChildren();
    this.selectComponent();
  }

  protected getChildren() {
    if (!this.model().hasChildren || this.children().length) return;

    this.treeService.getChildren(this.model().id)
      .subscribe(children => this.children.set(children));
  }

  private selectComponent() {
    this.componentService.setSelectedComponent(this.model());
    this.navigateToComponent();
  }

  private navigateToComponent() {
    if (this.isComponent()) {
      this.router.navigate(['component', this.model().id], { relativeTo: this.activatedRoute });
    }
  }

  private isComponent(): boolean {
    return this.model().type === TreeItemType.Component;
  }
}
