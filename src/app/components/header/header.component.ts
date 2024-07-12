import { Component, signal, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Company } from '../../models/company.model';
import { CompanyService } from '../../services/company.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  protected companies: Signal<Company[]> = signal([]);

  constructor(private companyService: CompanyService) {
    this.setCompanies();
  }

  private setCompanies() {
    this.companies = toSignal(this.companyService.getCompanies(), { initialValue: [] });
  }
}
