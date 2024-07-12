import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Company } from '../models/company.model';

@Injectable({
  providedIn: 'root'
})
export class AppContextService {

  public currentCompany: BehaviorSubject<Company> = new BehaviorSubject<Company>(new Company('', ''));

  constructor(private router: Router) { }

  public setCurrentCompany(company: Company) {
    this.currentCompany.next(company);
    this.router.navigate(['/company', company.id]);
  }
}
