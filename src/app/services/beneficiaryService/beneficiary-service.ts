import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BeneficiaryModel } from '../../model/beneficiary.model';
// export interface BeneficiaryModel {
//   id: number;
//   name: string;
//   username: string;
//   email: string;
//   address: Address;
//   phone: string;
//   website: string;
//   company: Company;
// }

// export interface Address {
//   street: string;
//   suite: string;
//   city: string;
//   zipcode: string;
//   geo: Geo;
// }

// export interface Geo {
//   lat: string;
//   lng: string;
// }

// export interface Company {
//   name: string;
//   catchPhrase: string;
//   bs: string;
// }

@Injectable({
  providedIn: 'root',
})
export class BeneficiaryService {
  constructor(private http: HttpClient) {}

  //get beene list
  getBeneficiaries(): Observable<BeneficiaryModel[]> {
    const beneUrl = `https://jsonplaceholder.typicode.com/users`;
    return this.http.get<BeneficiaryModel[]>(beneUrl);
  }
  //serch matching bene
  getBeneficiarieSearch(term: string): Observable<BeneficiaryModel[]> {
    const beneUrl = `https://jsonplaceholder.typicode.com/users?q=${term}`;
    return this.http.get<BeneficiaryModel[]>(beneUrl);
  }
}
