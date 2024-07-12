import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';
import { CompanyRepository } from '../repositories/company.repository';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private companyRepository: CompanyRepository) { }

  public getCompanies(): Observable<Company[]> {
    return this.companyRepository.getCompanies();
  }

}
