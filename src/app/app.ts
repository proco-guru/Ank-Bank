import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountCards } from './components/account-cards/account-cards';
import { FundTransfer } from './components/fund-transfer/fund-transfer';
import { FormControl, FormsModule } from '@angular/forms';
import { TransactionHistory } from './components/transaction-history/transaction-history';

@Component({
  selector: 'app-root',
  imports: [AccountCards, FundTransfer, FormsModule, TransactionHistory],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PracBank');
}
