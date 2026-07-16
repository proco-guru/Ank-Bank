import { HttpClient } from '@angular/common/http';
import { LocationUpgradeModule } from '@angular/common/upgrade';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

export interface LoanApplication {
  applicantName: string;
  loanAmount: number;
  loanType: 'HOME' | 'PERSONAL' | 'VEHICLE' | 'EDUCATION';
  tenure: number; // in months
  annualIncome: number;
  creditScore: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoanService {
  private readonly loanURL = 'https://jsonplaceholder.typicode.com/posts';
  constructor(private http: HttpClient) {}
  private currentCreditScore = new BehaviorSubject<number>(750);
  creditScore$ = this.currentCreditScore.asObservable();

  //method for setting credit val to subject
  setCreditScore(newCredit: number) {
    this.currentCreditScore.next(newCredit);
  }

  //method is to find the amount eligibility based on credit amount
  getEligibleLoanAmount(): Observable<number> {
    return this.creditScore$.pipe(
      map((creditScore: number) => {
        if (creditScore >= 750) {
          //if credit score is more than 750, then eligible for 50lacs
          return 5000000;
        } else if (creditScore >= 650) {
          //if creadit score is more than 650, then eligible for 25lacs
          return 2500000;
        }
        return 0; // Default fallback for scores below 650
      }),
    );
  }

  //post data to the API and retun observable
  applyForLoan(application: LoanApplication): Observable<LoanApplication> {
    return this.http.post<LoanApplication>(this.loanURL, application);
  }
}
