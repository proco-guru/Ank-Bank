import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  accountNotSameValidator,
  ifscValidator,
  noSpecialCharactersValidator,
} from '../../shared/customValidators/custom-validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-fund-transfer-reactive',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './fund-transfer-reactive.html',
  styleUrl: './fund-transfer-reactive.css',
})
export class FundTransferReactive implements OnInit {
  amountTransfer!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
  ) {}
  ngOnInit(): void {
    //defining form structure and input format with validatations
    this.amountTransfer = this.fb.group(
      {
        fromAccount: ['SB001'], //setting default val
        beneficiaryName: [
          '',
          [Validators.required, Validators.minLength(3), noSpecialCharactersValidator()],
        ],
        beneficiaryAccount: ['', [Validators.required, Validators.pattern(/^\d{9,18}$/)]],
        ifscCode: ['', [Validators.required, ifscValidator()]],
        amount: [0, [Validators.required, Validators.min(1), Validators.max(1000000)]],
        transferType: ['NEFT', Validators.required],
      },
      {
        //validate that no field can contains sameAccNo
        validators: [accountNotSameValidator()], // cross-field at group level
      },
    );
  }

  //getters for easy access to form props
  get beneficiaryName() {
    return this.amountTransfer.get('beneficiaryName')!;
  }
  get beneficiaryAccount() {
    return this.amountTransfer.get('beneficiaryAccount')!;
  }
  get transferType() {
    return this.amountTransfer.get('transferType')!;
  }
  get ifscCode() {
    return this.amountTransfer.get('ifscCode')!;
  }
  get amount() {
    return this.amountTransfer.get('amount')!;
  }

  //method to validating form submission and navigate to txn history page
  onTransfer() {
    this.amountTransfer.markAllAsTouched();

    //chck is form is valid or not
    if (this.amountTransfer.invalid) {
      console.log('Form is invalid!', this.amountTransfer.errors);
      return; // Stops execution if any control fails validation
    }
    console.log('Form Submitted Successfully:', this.amountTransfer.value);
    console.log(this.amountTransfer.status);
    console.log(this.amountTransfer.controls);
    this.router.navigate(['/transaction']); // Absolute path with leading slash
  }
}
