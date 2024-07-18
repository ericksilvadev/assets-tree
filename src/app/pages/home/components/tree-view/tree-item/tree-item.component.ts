import { ChangeDetectionStrategy, Component, computed, ElementRef, input, OnDestroy, OnInit, signal, ViewChild, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IconComponent } from "../../../../../components/icon/icon.component";
import { Sensors } from '../../../../../models/sensors.enum';
import { Status } from '../../../../../models/status.enum';
import { ComponentService } from '../../../../../services/component.service';
import { TreeService } from '../../../../../services/tree.service';
import { TreeItemType } from '../../../../../models/tree-item.enum';
import { TreeItemModel } from '../../../../../models/tree-item.model';
import { FilterService } from '../../../../../services/filter.service';

@Component({
  selector: 'app-tree-item',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './tree-item.component.html',
  styleUrl: './tree-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeItemComponent implements OnDestroy, OnInit {
  public model = input<TreeItemModel>(new TreeItemModel('', '', TreeItemType.Location, null, null));

  private _selectedComponentSubscription: Subscription;
  private _filterChangeSubscription: Subscription;
  private _getChildrenSubscription?: Subscription;

  protected indent = input<number>(0);
  protected sensorIconColorClass = computed(() => this.getSensorIconColorClasss());
  protected sensorIcon = computed(() => this.getSensorIconName());
  protected children: WritableSignal<TreeItemModel[]> = signal<TreeItemModel[]>([]);
  protected isSelected = signal(false);

  @ViewChild('details', { static: true }) details?: ElementRef<HTMLDetailsElement>;

  constructor(
    private treeService: TreeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private componentService: ComponentService,
    filterService: FilterService) {
    this._selectedComponentSubscription = componentService.selectedComponent.subscribe(selectedComponent => {
      this.isSelected.set(Boolean(selectedComponent.id) && selectedComponent.id === this.model().id);
    });

    this._filterChangeSubscription = filterService.filter.subscribe(() => {
      this.children.set([]);
      this.details?.nativeElement?.removeAttribute('open');
    });
  }

  ngOnInit(): void {
    this.setSelected();
  }

  private setSelected() {
    const selectedComponent = this.componentService.selectedComponent.value;

    this.isSelected.set(Boolean(selectedComponent.id) && selectedComponent.id === this.model().id);
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
    this._filterChangeSubscription.unsubscribe();
  }
}
