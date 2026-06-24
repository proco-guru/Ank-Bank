import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

//defining API response model
export interface CustomerDetails {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  //url for specific module
  private usersBaseApi = `${environment.apiBaseURL}/users`;

  //get method
  getCustomerDetails(): Observable<CustomerDetails[]> {
    return this.http.get<CustomerDetails[]>(this.usersBaseApi);
  }

  //getById method
  getCustomerDetailsById(id: number): Observable<CustomerDetails> {
    return this.http.get<CustomerDetails>(`${this.usersBaseApi}/${id}`);
  }

  //post method for create/add record
  createCustomerDetails(customer: CustomerDetails): Observable<CustomerDetails> {
    return this.http.post<CustomerDetails>(this.usersBaseApi, customer);
  }
}
