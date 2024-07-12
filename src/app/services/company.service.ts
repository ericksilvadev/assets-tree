import { Injectable, signal, WritableSignal } from '@angular/core';
import { map } from 'rxjs';
import { Company } from '../models/company.model';
import { CompanyRepository } from '../repositories/company.repository';
import { AppContextService } from './app-context.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public companies: WritableSignal<Company[]> = signal([]);

  constructor(private companyRepository: CompanyRepository, private appContext: AppContextService) {
    this.setCompanies();
  }

  public setCompanies() {
    this.companyRepository.getCompanies()
      .pipe(map((companies) => this.mapCompanies(companies)))
      .subscribe((companies) => {
        this.companies.set(companies);

        this.setCurrentCompanyIfNotSet(companies[0]);
      });
  }

  private mapCompanies(companies: Company[]): Company[] {
    return companies.map((company) => new Company(company.id, company.name + ' Unit'));
  }

  private setCurrentCompanyIfNotSet(company: Company) {
    if (this.appContext.currentCompany.value.id === '') {
      this.appContext.setCurrentCompany(company);
    }
  }

}
