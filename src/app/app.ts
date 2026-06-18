import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountCards } from './components/account-cards/account-cards';
import { FundTransfer } from './components/fund-transfer/fund-transfer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AccountCards, FundTransfer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('PracBank');
}
