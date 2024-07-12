import { Injectable, signal, WritableSignal } from '@angular/core';
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
      .subscribe((companies) => {
        this.companies.set(companies);

        if (this.appContext.currentCompany.value.id === '') {
          this.appContext.setCurrentCompany(companies[0]);
        }
      });
  }

}
