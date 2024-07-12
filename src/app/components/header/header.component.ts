import { Component, computed, OnDestroy, signal, Signal, WritableSignal } from '@angular/core';
import { Subscription } from 'rxjs';
import { Company } from '../../models/company.model';
import { AppContextService } from '../../services/app-context.service';
import { CompanyService } from '../../services/company.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {

  protected companies: Signal<Company[]> = computed(() => this.companyService.companies());

  protected currentCompany: WritableSignal<Company> = signal(new Company('', ''));

  private _companySubscription: Subscription;

  constructor(private companyService: CompanyService, contextService: AppContextService) {
    this._companySubscription = contextService.currentCompany.subscribe((company) => {
      this.currentCompany.set(company);
    });
  }

  ngOnDestroy(): void {
    this._companySubscription.unsubscribe();
  }
}
