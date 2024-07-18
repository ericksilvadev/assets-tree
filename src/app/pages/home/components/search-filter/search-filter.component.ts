import { Component, OnDestroy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Subscription } from 'rxjs';
import { FilterModel } from '../../../../models/filter.model';
import { FilterService } from '../../../../services/filter.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from "../../../../components/icon/icon.component";

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IconComponent],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent implements OnDestroy {

  protected get filter(): BehaviorSubject<FilterModel> {
    return this.filterService.filter
  };

  protected search = new FormControl('');

  private _filterSubscription: Subscription;

  constructor(private filterService: FilterService) {
    this._filterSubscription = this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => this.filterService.setSearchFilter(value ?? ''));
  }

  ngOnDestroy(): void {
    this._filterSubscription.unsubscribe();
  }
}
