import { Injectable } from '@angular/core';

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
      amount: 15000,
      balanceAfter: 343150,
      status: 'PENDING',
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
      balanceAfter: 358749,
      status: 'SUCCESS',
    },
    {
      txnId: 1006,
      date: new Date('2026-06-15'),
      description: 'Cloth Payment Debited',
      type: 'DEBIT',
      amount: 22000,
      balanceAfter: 336749,
      status: 'SUCCESS',
    },
  ];

  //retrun the copy of txn array
  getTransactions(): Transaction[] {
    return [...this.transactions];
  }

  //update the trxn array using immutable form
  addTransaction(txn: Transaction): void {
    this.transactions = [...this.transactions, txn];
  }
}
