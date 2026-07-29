import { Component, numberAttribute, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { noSpecialCharactersValidator } from '../../../shared/customValidators/custom-validators';
import { Subscription } from 'rxjs';
import { LoanService } from '../../../services/loanService/loan-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loan-application',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './loan-application.html',
  styleUrl: './loan-application.css',
})
export class LoanApplication implements OnInit, OnDestroy {
  loanAppForm!: FormGroup;
  private subscriptions: Subscription[] = [];
  isSubmitting: boolean = false;

  constructor(
    private fb: FormBuilder,
    private loanService: LoanService,
  ) {}
  ngOnInit(): void {
    //sub method to get eligibl Amount for the cust based on their currnt balance
    const sub = this.loanService.getEligibleLoanAmount().subscribe({
      next: (eligibleAmount) => {
        this.buildForm(eligibleAmount); // call method for form, AFTER amountEligibility is known
      },
    });
    this.subscriptions.push(sub); //collecting subs
  }

  //formBuilder method for validations and structure defination
  buildForm(maxLoanAmount: number): void {
    //Loan form format and validator
    this.loanAppForm = this.fb.group({
      applicantName: [
        '',
        [Validators.required, Validators.minLength(3), noSpecialCharactersValidator()],
      ],
      loanAmount: [
        '',
        [Validators.required, Validators.min(100000), Validators.max(maxLoanAmount)],
      ],
      loanType: ['', [Validators.required]],
      tenure: ['', [Validators.required, Validators.min(12), Validators.max(360)]],
      annualIncome: ['', [Validators.required, Validators.min(300000)]],
    });
  }

  //getters for form details
  get applicantName() {
    return this.loanAppForm.get('applicantName');
  }
  get loanAmount() {
    return this.loanAppForm.get('loanAmount');
  }
  get loanType() {
    return this.loanAppForm.get('loanType');
  }
  get tenure() {
    return this.loanAppForm.get('tenure');
  }
  get annualIncome() {
    return this.loanAppForm.get('annualIncome');
  }

  //method get called on applyLoan btn submission
  applyLoan(): void {
    //instead of loader maintaing flag for now
    this.isSubmitting = true;
    this.loanAppForm.markAllAsTouched();
    //if invalid
    if (this.loanAppForm.invalid) {
      return;
    }

    //applyingLoan by subscribing post API and error handling
    const sub = this.loanService.applyForLoan(this.loanAppForm.value).subscribe({
      next: (response) => {
        console.log('success response:', response);
        alert('Success response!');
      },
      error: (err) => {
        console.error('error encountered:', err);
      },
    });
    this.subscriptions.push(sub);
  }

  //unsubscribing sub
  ngOnDestroy(): void {
    this.subscriptions.forEach((a) => a.unsubscribe());
  }
}
