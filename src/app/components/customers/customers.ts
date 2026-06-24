import { Component, OnInit } from '@angular/core';
import { CustomerDetails, CustomerService } from '../../services/customer-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customers',
  imports: [CommonModule],
  templateUrl: './customers.html',
  styleUrl: './customers.css',
})
export class Customers implements OnInit {
  public customerData: CustomerDetails[] = [];
  public isLoading: boolean = true;
  public errorMessage: string = '';

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    //for retriving data from The API
    this.customerService.getCustomerDetails().subscribe({
      next: (data) => {
        this.customerData = data; //retrived data
        this.isLoading = false;
        console.log(this.customerData);
      },
      error: (err) => {
        console.error('API error:', err);
        this.errorMessage = 'Failed to load Customer. Please try again.';
        this.isLoading = false;
      },
    });
  }

  //sample data for addition of new cust
  custData: CustomerDetails = {
    id: 11,
    name: 'Ankita Pawar',
    username: 'Moriah.Stanton',
    email: 'Rey.Padberg@karina.biz',
    address: {
      street: 'kiwale ',
      suite: 'Suite 198',
      city: 'Lebsackbury',
      zipcode: '31428-2261',
      geo: {
        lat: '-38.2386',
        lng: '57.2232',
      },
    },
    phone: '024-648-3804',
    website: 'ambrose.net',
    company: {
      name: 'Hoeger LLC',
      catchPhrase: 'Centralized empowering task-force',
      bs: 'target end-to-end models',
    },
  };

  //method is get called for posting data/add data in db
  createCustomerData(): void {
    this.customerService.createCustomerDetails(this.custData).subscribe({
      next: (data) => {
        this.isLoading = false;
        this.customerData = [...this.customerData, data]; //  re-calling fetch logic to retrive updated data

        console.log(data);
      },
      error: (err) => {
        console.error('API error:', err);
        this.errorMessage = 'Failed to load Customer. Please try again.';
        this.isLoading = false;
      },
    });
  }
  //trackBy method
  trackByCustomerId(index: number, cust: CustomerDetails): number {
    return cust.id;
  }
}
