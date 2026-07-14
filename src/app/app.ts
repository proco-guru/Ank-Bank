import { Component, NgModule, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Layout } from './components/layouts/layout/layout';
// import { AccountCards } from './components/account-cards/account-cards';
// import { FundTransfer } from './components/fund-transfer/fund-transfer';
// import { TransactionHistory } from './components/transaction-history/transaction-history';
// import { AccountBalanceWidget } from './components/account-balance-widget/account-balance-widget';
// import { Customers } from './components/customers/customers';

@Component({
  selector: 'app-root',
  imports: [
    // AccountCards,
    // FundTransfer,
    // FormsModule,
    // TransactionHistory,
    // AccountBalanceWidget,
    // Customers,
    CommonModule,
    FormsModule,
    RouterOutlet,
    Layout,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PracBank');

  isTxnHistoryVisible: boolean = true;

  toggleTxnHistoryDetails(): void {
    this.isTxnHistoryVisible = !this.isTxnHistoryVisible;
  }
  get isLoggedIn(): boolean {
    return localStorage.getItem('isCustLogin') === 'true';
  }
}
