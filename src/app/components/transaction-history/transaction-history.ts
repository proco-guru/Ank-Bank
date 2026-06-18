import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
//define txnType
interface Transaction {
  txnId: string;
  date: Date;
  description: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  balanceAfter: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}
@Component({
  selector: 'app-transaction-history',
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory {
  selectedType: 'All' | 'CREDIT' | 'DEBIT' = 'All'; //setting fix reqiured types, and default =ALL

  transactions: Transaction[] = [
    {
      txnId: 'TXN1001',
      date: new Date('2026-06-15'),
      description: 'Salary Credit - Infosys Ltd',
      type: 'CREDIT',
      amount: 85000,
      balanceAfter: 425750,
      status: 'SUCCESS',
    },
    {
      txnId: 'TXN1002',
      date: new Date('2026-06-14'),
      description: 'Electricity Bill - MSEB',
      type: 'DEBIT',
      amount: 2400,
      balanceAfter: 340750,
      status: 'SUCCESS',
    },
    {
      txnId: 'TXN1003',
      date: new Date('2026-06-13'),
      description: 'NEFT to Ramesh Kumar',
      type: 'DEBIT',
      amount: 15000,
      balanceAfter: 343150,
      status: 'PENDING',
    },
    {
      txnId: 'TXN1004',
      date: new Date('2026-06-12'),
      description: 'Mobile Recharge - Jio',
      type: 'DEBIT',
      amount: 599,
      balanceAfter: 358150,
      status: 'FAILED',
    },
    {
      txnId: 'TXN1005',
      date: new Date('2026-06-10'),
      description: 'Freelance Payment Received',
      type: 'CREDIT',
      amount: 22000,
      balanceAfter: 358749,
      status: 'SUCCESS',
    },
    {
      txnId: 'TXN1006',
      date: new Date('2026-06-15'),
      description: 'Cloth Payment Debited',
      type: 'DEBIT',
      amount: 22000,
      balanceAfter: 336749,
      status: 'SUCCESS',
    },
  ];

  //using getter prop to :filter txnData and return based on TxnType
  get filteredTransactions(): Transaction[] {
    if (this.selectedType === 'All') {
      return this.transactions;
    }
    return this.transactions.filter((txn) => txn.type === this.selectedType);
  }

  // Add this method to the class
  trackByTxnId(index: number, txn: Transaction): string {
    return txn.txnId;
  }
}
