import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

//define txnType
export interface Transaction {
  txnId: number;
  date: Date;
  description: string;
  type: 'CREDIT' | 'DEBIT';
  amount: number;
  balanceAfter: number;
  status: 'SUCCESS' | 'PENDING' | 'FAILED';
}
export interface BulkTransferResult {
  fromAccount: string;
  transfers: {
    beneficiaryName: string;
    accountNumber: string;
    amount: number;
    ifscCode: string;
    transferType: 'NEFT' | 'IMPS' | 'RTGS';
  }[];
}
@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  //sample API response
  private transactions: Transaction[] = [
    {
      txnId: 1001,
      date: new Date('2026-06-15'),
      description: 'Salary Credit - Infosys Ltd',
      type: 'CREDIT',
      amount: 85000,
      balanceAfter: 425750,
      status: 'SUCCESS',
    },
    {
      txnId: 1002,
      date: new Date('2026-06-14'),
      description: 'Electricity Bill - MSEB',
      type: 'DEBIT',
      amount: 2400,
      balanceAfter: 340750,
      status: 'SUCCESS',
    },
    {
      txnId: 1003,
      date: new Date('2026-06-13'),
      description: 'NEFT to Ramesh Kumar',
      type: 'DEBIT',
      amount: 343150,
      balanceAfter: 343150,
      status: 'SUCCESS',
    },
    {
      txnId: 1004,
      date: new Date('2026-06-12'),
      description: 'Mobile Recharge - Jio',
      type: 'DEBIT',
      amount: 599,
      balanceAfter: 358150,
      status: 'FAILED',
    },
    {
      txnId: 1005,
      date: new Date('2026-06-10'),
      description: 'Freelance Payment Received',
      type: 'CREDIT',
      amount: 22000,
      balanceAfter: 358150,
      status: 'SUCCESS',
    },
    {
      txnId: 1006,
      date: new Date('2026-06-09'),
      description: 'Cloth Payment Debited',
      type: 'DEBIT',
      amount: 22000,
      balanceAfter: 336150,
      status: 'SUCCESS',
    },
  ];

  private selectedTxnId = new BehaviorSubject<number>(1);
  custSelectedTxnId$ = this.selectedTxnId.asObservable();

  //set SelectedTxn by cust
  setSelectedTxn(txnId: number): void {
    console.log('setting Id:', txnId);
    this.selectedTxnId.next(txnId);
  }
  //retrun the copy of txn array
  getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  //update the trxn array using immutable form
  addTransaction(txn: Transaction): void {
    this.transactions = [...this.transactions, txn];
  }

  private currentBeneAccNum = new BehaviorSubject<string>('78966523569');
  patchBeneAccNumVal$ = this.currentBeneAccNum.asObservable();

  // Define your mock data matching the interface
  sampleBulkTransferData: BulkTransferResult = {
    fromAccount: 'SB-9876543210',
    transfers: [
      {
        beneficiaryName: 'John Doe',
        accountNumber: '123456789',
        amount: 5000,
        ifscCode: 'SBIN0001234',
        transferType: 'NEFT',
      },
    ],
  };

  getMultiTransferData(): BulkTransferResult {
    // Use curly braces to clone a single object instance safely
    return { ...this.sampleBulkTransferData };
  }
}
