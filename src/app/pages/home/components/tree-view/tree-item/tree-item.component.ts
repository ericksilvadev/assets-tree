import { ChangeDetectionStrategy, Component, computed, input, OnDestroy, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IconComponent } from "../../../../../components/icon/icon.component";
import { Sensors } from '../../../../../models/sensors.enum';
import { Status } from '../../../../../models/status.enum';
import { ComponentService } from '../../../../../services/component.service';
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
export class TreeItemComponent implements OnDestroy {
  public model = input<TreeItemModel>(new TreeItemModel('', '', TreeItemType.Location, null, null));

  private _selectedComponentSubscription: Subscription;
  private _getChildrenSubscription?: Subscription;

  protected indent = input<number>(0);
  protected sensorIconColorClass = computed(() => this.getSensorIconColorClasss());
  protected sensorIcon = computed(() => this.getSensorIconName());
  protected children: WritableSignal<TreeItemModel[]> = signal<TreeItemModel[]>([]);
  protected isSelected = signal(false);

  constructor(private treeService: TreeService, private router: Router, private activatedRoute: ActivatedRoute, private componentService: ComponentService) {
    this._selectedComponentSubscription = componentService.selectedComponent.subscribe(selectedComponent => {
      this.isSelected.set(Boolean(selectedComponent.id) && selectedComponent.id === this.model().id);
    });
  }

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

    this._getChildrenSubscription = this.treeService.getChildren(this.model().id)
      .subscribe(children => this.children.set(children));
  }

  private selectComponent() {
    if (this.isComponent()) {
      this.componentService.setSelectedComponent(this.model());
      this.navigateToComponent();
    }
  }

  private isComponent(): boolean {
    return this.model().type === TreeItemType.Component;
  }

  private navigateToComponent() {
    this.router.navigate(['component', this.model().id], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(): void {
    this._selectedComponentSubscription.unsubscribe();
    this._getChildrenSubscription?.unsubscribe();
  }
}
