import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  Transaction,
  TransactionService,
} from '../../../services/tansactionService/transaction-service';
import { TransferNotificationService } from '../../../services/transferNotification/transfer-notification-service';
import { Subscription } from 'rxjs';
import { Balance } from '../../balance/balance/balance';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, Balance],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  currentBalance!: number;
  txnList!: Transaction[];
  private subscriptions: Subscription[] = [];
  constructor(
    private txnService: TransactionService,
    private txnNotiService: TransferNotificationService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.txnNotiService.balance$.subscribe((balance) => {
        this.currentBalance = balance;
        console.log('===========get Latest val', this.currentBalance);
      }),
    );

    this.txnList = this.txnService.getTransactions();
  }

  onBalanceUpdated(currBalance: number) {
    this.txnNotiService.setCurrentBalance(currBalance);
    console.log('===========set val', currBalance);
  }
}
