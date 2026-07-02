import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaskedAccountPipe } from '../../pipes/masked-account-pipe-pipe';
import { CustomerService } from '../../services/customer-service';
@Component({
  selector: 'app-fund-transfer',
  imports: [FormsModule, CommonModule, MaskedAccountPipe],
  templateUrl: './fund-transfer.html',
  styleUrl: './fund-transfer.css',
})
export class FundTransfer implements OnInit {
  constructor(public customerService: CustomerService) {}
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

  ngOnInit(): void {
    this.customerService.getUser().subscribe((user) => {
      console.log('user in fund xfer', user);
    });
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
