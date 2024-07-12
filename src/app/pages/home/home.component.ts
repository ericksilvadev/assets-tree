import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../../models/company.model';
import { AppContextService } from '../../services/app-context.service';
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { FilterComponent } from "./components/filter/filter.component";
import { TreeViewComponent } from "./components/tree-view/tree-view.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BreadcrumbsComponent, FilterComponent, TreeViewComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  protected selectedCompany: Company = new Company('', '');

  private _companySubscription: Subscription

  constructor(appContext: AppContextService) {
    this._companySubscription = appContext.currentCompany.subscribe((company) => {
      this.selectedCompany = company;
    });
  }

  ngOnDestroy(): void {
    this._companySubscription.unsubscribe();
  }
}
