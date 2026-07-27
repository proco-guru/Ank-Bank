import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ifscValidator,
  noSpecialCharactersValidator,
} from '../../../customValidators/custom-validators';
import { CommonModule } from '@angular/common';
import {
  BulkTransferResult,
  TransactionService,
} from '../../../services/tansactionService/transaction-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-bulktransfer',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bulktransfer.html',
  styleUrl: './bulktransfer.css',
})
export class Bulktransfer implements OnInit {
  bulkTransferForm!: FormGroup;
  // patchBeneAccNum$!: Observable<string>;
  constructor(
    private fb: FormBuilder,
    private txnService: TransactionService,
  ) {}

  ngOnInit(): void {
    // 2. Fetch the corrected data payload object
    const savedData: BulkTransferResult = this.txnService.getMultiTransferData();

    this.bulkTransferForm = this.fb.group({
      fromAccount: ['SB-9876543210', Validators.required],
      // FormArray — starts with ONE transfer row
      transfers: this.fb.array([
        this.createTransferRow(), // helper method — explained below
      ]),
    });
    // 3. Pass it to your existing patching method
    this.loadSavedTransfer(savedData);
  }

  // Helper — creates one transfer FormGroup (one row in the table)
  // Extracted as a method so we can call it every time user adds a row
  createTransferRow(): FormGroup {
    return this.fb.group({
      beneficiaryName: [
        '',
        [Validators.required, Validators.minLength(2), noSpecialCharactersValidator()],
      ],
      accountNumber: ['', [Validators.required, Validators.pattern(/^\d{9,18}$/)]],
      amount: [0, [Validators.required, Validators.min(1), Validators.max(1000000)]],
      ifscCode: ['', [Validators.required, ifscValidator()]],
      transferType: ['NEFT', Validators.required],
    });
  }

  // CRITICAL — getter for clean template access
  // Returns the 'transfers' control cast as FormArray
  get transfers(): FormArray {
    return this.bulkTransferForm.get('transfers') as FormArray;
  }

  // Add a new empty row
  addTransfer(): void {
    this.transfers.push(this.createTransferRow());
  }

  // Remove a row by index
  removeTransfer(index: number): void {
    if (this.transfers.length > 1) {
      this.transfers.removeAt(index);
    }
    // Prevent removing the last row — always keep at least one
  }

  // Access individual controls within a row for error display
  getControl(rowIndex: number, controlName: string) {
    return (this.transfers.at(rowIndex) as FormGroup).get(controlName);
  }

  get totalAmount(): number {
    return this.transfers.controls
      .map((control) => control.get('amount')?.value || 0)
      .reduce((sum, amount) => sum + amount, 0);
  }

  onSubmit(): void {
    this.bulkTransferForm.markAllAsTouched();
    if (this.bulkTransferForm.invalid) {
      console.log('Form invalid — check all rows');
      return;
    }

    const result: BulkTransferResult = this.bulkTransferForm.value;
    console.log('Bulk transfer submitted:', result);
    console.log(`Total: ₹${this.totalAmount} across ${this.transfers.length} transfers`);
  }
  // In your component
  onTransferTypeChange(rowIndex: number): void {
    const row = this.transfers.at(rowIndex) as FormGroup;
    const amountControl = row.get('amount')!;
    const transferType = row.get('transferType')?.value;

    // Clear existing validators
    amountControl.clearValidators();

    if (transferType === 'RTGS') {
      // RTGS — RBI mandates minimum ₹2,00,000
      amountControl.setValidators([
        Validators.required,
        Validators.min(200000),
        Validators.max(1000000),
      ]);
    } else if (transferType === 'IMPS') {
      // IMPS — maximum ₹5,00,000
      amountControl.setValidators([Validators.required, Validators.min(1), Validators.max(500000)]);
    } else {
      // NEFT — standard limits
      amountControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(1000000),
      ]);
    }

    // CRITICAL — must call after changing validators
    amountControl.updateValueAndValidity();
  }
  trackByTxn(index: number, txn: any): string | number {
    // Return a unique identifier field from your object, like an account number or ID
    return txn.accountNumber || index;
  }

  // Patch entire form including FormArray
  loadSavedTransfer(savedData: BulkTransferResult): void {
    while (this.transfers.length > 0) {
      this.transfers.removeAt(0);
    }

    if (savedData.transfers.length === 0) {
      this.transfers.push(this.createTransferRow()); // always keep at least one
      return;
    }

    savedData.transfers.forEach((transfer) => {
      const row = this.createTransferRow();
      row.patchValue(transfer);
      this.transfers.push(row);
    });

    this.bulkTransferForm.patchValue({ fromAccount: savedData.fromAccount });
  }
}
