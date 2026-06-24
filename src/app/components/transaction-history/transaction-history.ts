import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionService } from '../../services/transaction-service';

@Component({
  selector: 'app-transaction-history',
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnDestroy {
  transactions!: Transaction[];
  //append dummy data for now
  txnDetail: Transaction = {
    txnId: 1007,
    date: new Date(),
    description: 'Grocery Payment Debited',
    type: 'DEBIT',
    amount: 26500,
    balanceAfter: 336749,
    status: 'SUCCESS',
  };

  constructor(private transactionService: TransactionService) {}
  ngOnInit() {
    this.transactions = this.transactionService.getTransactions();
  }

  selectedType: 'All' | 'CREDIT' | 'DEBIT' = 'All'; //setting fix reqiured types, and default =ALL

  //using getter prop to :filter txnData and return based on TxnType
  get filteredTransactions(): Transaction[] {
    if (this.selectedType === 'All') {
      return this.transactions;
    }
    return this.transactions.filter((txn) => txn.type === this.selectedType);
  }

  // Add this method to the class
  trackByTxnId(index: number, txn: Transaction): number {
    return txn.txnId;
  }

  //method is to add/append new txn history record
  addTxnDetails(): void {
    //to append txn
    this.transactionService.addTransaction(this.txnDetail);
    this.transactions = this.transactionService.getTransactions(); //to get updated/latest txns record
  }

  ngOnDestroy() {
    console.log('TransactionHistory destroyed');
  }
}
