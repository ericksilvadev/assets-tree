import { Injectable, signal, WritableSignal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { map } from 'rxjs';
import { Company } from '../models/company.model';
import { CompanyRepository } from '../repositories/company.repository';
import { AppContextService } from './app-context.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public companies: WritableSignal<Company[]> = signal([]);

  private companyParamId: string = '';

  constructor(private companyRepository: CompanyRepository, private appContext: AppContextService, private router: Router) {
    this.setupByRoute();
  }

  private setupByRoute() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const companyId = event.url.split('/').pop();
        this.companyParamId = companyId ?? '';
        this.setCompanies();
      }
    });
  }

  public setCompanies() {
    this.companyRepository.getCompanies()
      .pipe(map((companies) => this.mapCompanies(companies)))
      .subscribe((companies) => {
        this.companies.set(companies);

        this.setCompanyById();
      });
  }

  private mapCompanies(companies: Company[]): Company[] {
    return companies.map((company) => new Company(company.id, company.name + ' Unit'));
  }

  private setCompanyById() {
    if (this.appContext.currentCompany.value.id) return;

    const company = this.companies().find((company) => company.id === this.companyParamId);

    if (company?.id != this.appContext.currentCompany.value.id) {
      this.appContext.setCurrentCompany(company ?? this.companies()[0]);
    }
  }

}
