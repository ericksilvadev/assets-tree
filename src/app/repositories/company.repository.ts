import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environment/environment";
import { Company } from "../models/company.model";

@Injectable({
  providedIn: 'root'
})
export class CompanyRepository {

  constructor(private http: HttpClient) { }

  public getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(`${environment.baseApiUrl}/companies`);
  }

}