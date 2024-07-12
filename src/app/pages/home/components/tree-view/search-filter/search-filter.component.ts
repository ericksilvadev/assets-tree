import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { FilterModel } from '../../../../../models/filter.model';
import { FilterService } from '../../../../../services/filter.service';
import { CommonModule } from '@angular/common';
import { IconComponent } from "../../../../../components/icon/icon.component";

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, IconComponent],
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {

  protected get filter(): BehaviorSubject<FilterModel> {
    return this.filterService.filter
  };

  protected search = new FormControl('');

  constructor(private filterService: FilterService) {
    this.search.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((value) => this.filterService.setSearchFilter(value ?? ''));
  }
}
