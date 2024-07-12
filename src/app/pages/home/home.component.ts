import { Component, OnDestroy } from '@angular/core';
import { BreadcrumbsComponent } from "./components/breadcrumbs/breadcrumbs.component";
import { AppContextService } from '../../services/app-context.service';
import { Company } from '../../models/company.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BreadcrumbsComponent],
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
