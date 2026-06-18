import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-fund-transfer',
  imports: [FormsModule, CommonModule],
  templateUrl: './fund-transfer.html',
  styleUrl: './fund-transfer.css',
})
export class FundTransfer {
  constructor() {}
  beneficiaryName: string = '';
  beneficiaryAccount: string = ''; // Best practice: strings prevent leading zero truncation in HTML inputs
  transferAmount: number = 0;
  transferType: string[] = ['NEFT', 'IMPS', 'RTGS'];
  selectedTransferType: string = 'NEFT'; // Track the chosen type
  isTxnSuccess: boolean = false;

  //initate the txn
  initiateTransaction(): void {
    this.isTxnSuccess = true;
  }

  //to clear the form
  clearForm(): void {
    this.beneficiaryName = '';
    this.beneficiaryAccount = '';
    this.transferAmount = 0;
  }

  //getter prop for validating is all fields are field proprly , then only enable 'initiateTxn' btn
  get isFormValid(): boolean {
    return (
      !!this.beneficiaryName &&
      !!this.beneficiaryAccount &&
      this.transferAmount > 0 &&
      !!this.selectedTransferType
    );
  }
}
