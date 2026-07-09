import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaskedAccountPipe } from '../../pipes/masked-account-pipe-pipe';
import { CustomerService } from '../../services/customer-service';
import { TransactionService } from '../../services/transaction-service';
import { TransferNotificationService } from '../../services/transfer-notification-service';
@Component({
  selector: 'app-fund-transfer',
  imports: [FormsModule, CommonModule, MaskedAccountPipe],
  templateUrl: './fund-transfer.html',
  styleUrl: './fund-transfer.css',
})
export class FundTransfer implements OnInit {
  constructor(
    private customerService: CustomerService,
    private transactionService: TransactionService,
    private transactionNotificationService: TransferNotificationService,
  ) {}
  beneficiaryName: string = '';
  beneficiaryAccount: string = ''; // Best practice: strings prevent leading zero truncation in HTML inputs
  transferAmount: number = 0;
  transferType: string[] = ['NEFT', 'IMPS', 'RTGS'];
  selectedTransferType: string = 'NEFT'; // Track the chosen type
  isTxnSuccess: boolean = false;
  currentBankBalance: number = 0;
  //initate the txn
  initiateTransaction(): void {
    this.isTxnSuccess = true;

    //passing/setting val to subject
    this.transactionNotificationService.notifyTransferCompleted(
      this.transferAmount,
      this.beneficiaryAccount,
    );

    //fetching the list of transactions as i want balanceAmount post last txn
    const transactionList = this.transactionService.getTransactions();
    if (transactionList.length > 0) {
      // Using index, to fetch last txn record
      const lastObject = transactionList[transactionList.length - 1];
      this.currentBankBalance = lastObject.balanceAfter - this.transferAmount; //calculation: bankbalance-tnferAmount
      this.transactionNotificationService.setCurrentBalance(this.currentBankBalance); // setting current balance
    }
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
