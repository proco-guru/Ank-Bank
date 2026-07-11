import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Transaction, TransactionService } from '../../../services/transaction-service';
import { Subscription } from 'rxjs';
import { TransferNotificationService } from '../../../services/transfer-notification-service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction-history',
  imports: [FormsModule, CommonModule],
  templateUrl: './transaction-history.html',
  styleUrl: './transaction-history.css',
})
export class TransactionHistory implements OnInit, OnDestroy {
  urlParamId: string = '';
  selectedTxnId: number = 0;
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
  private subscriptions: Subscription[] = [];
  bankBalance: number = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    private transactionNotificationService: TransferNotificationService,
  ) {}
  ngOnInit() {
    //method is to get the id from URL
    this.urlParamId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('++++++++ID printed', this.urlParamId);

    //---get txn data from services
    this.transactions = this.transactionService.getTransactions();

    //subscribing to behaviouralSubject to get the transaction status
    const sub = this.transactionNotificationService.transferCompleted$.subscribe((event) => {
      console.log(`Transfer of ₹${event.amount} completed — refreshing balance`);
      this.transactions = this.transactionService.getTransactions(); //to get updated/latest txns record
    });

    const sub2 = this.transactionNotificationService.balance$.subscribe((balance) =>
      console.log(balance + '--------------currunt balance'),
    );
    this.subscriptions.push(sub, sub2);
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
    // unsubscribe obsrvable
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    console.log('objct is unsubsribed');
  }

  //--method get called on txnRow click, navigates to txn Page along with selected txnId as param
  onTransactionRowClick(txnId: number) {
    this.selectedTxnId = txnId;
    console.log('++++++++ Txn ID', this.selectedTxnId);
    this.router.navigate(['/transaction', txnId]); //navigating to the URL with param
  }
}
