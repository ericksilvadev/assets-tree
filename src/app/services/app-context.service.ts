import { Injectable, signal, WritableSignal } from '@angular/core';
import { Company } from '../models/company.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  public currentCompany: BehaviorSubject<Company> = new BehaviorSubject<Company>(new Company('', ''));

  constructor() { }

  public setCurrentCompany(company: Company) {
    this.currentCompany.next(company);
  }
}
