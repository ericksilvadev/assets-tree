import { Injectable, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Company } from '../models/company.model';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  public companies: Signal<Company[]> = signal([]);

  constructor(private companyRepository: CompanyRepository) {
    this.setCompanies();
  }

  public setCompanies() {
    this.companies = toSignal(this.companyRepository.getCompanies(), { initialValue: [] });
  }

}
