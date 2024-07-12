import { ChangeDetectionStrategy, Component, OnDestroy, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { IconComponent } from "../../../../components/icon/icon.component";
import { FilterModel, Sensors } from '../../../../models/filter.model';
import { FilterService } from '../../../../services/filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [IconComponent, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterComponent implements OnDestroy {

  protected get filter(): BehaviorSubject<FilterModel> {
    return this.filterService.filter
  };

  protected energyChecked: WritableSignal<boolean> = signal(false);

  private _filterSubscription: Subscription;

  constructor(private filterService: FilterService) {
    this._filterSubscription = this.filterService.filter.subscribe(filter => {
      this.updateEnergySensorCheck(filter);
    });
  }

  private updateEnergySensorCheck(filter: FilterModel) {
    this.energyChecked.set(filter.sensors.includes(Sensors.Energy));
  }

  protected onEnergyFilterChange(checked: boolean) {
    const filter = { ...this.filter.value };

    this.updateSensorFilter(filter, checked);
  }

  private updateSensorFilter(filter: FilterModel, checked: boolean) {
    if (checked) {
      filter.sensors.push(Sensors.Energy);
    } else {
      filter.sensors = filter.sensors.filter(sensor => sensor !== Sensors.Energy);
    }

    this.filterService.setFilter(filter);
  }

  ngOnDestroy() {
    this._filterSubscription.unsubscribe();
  }

}
