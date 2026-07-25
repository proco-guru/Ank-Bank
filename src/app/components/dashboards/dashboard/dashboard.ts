import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import {
  Transaction,
  TransactionService,
} from '../../../services/tansactionService/transaction-service';
import { TransferNotificationService } from '../../../services/transferNotification/transfer-notification-service';
import { combineLatest, of, Subscription } from 'rxjs';
import { Balance } from '../../balance/balance/balance';
import { CommonModule } from '@angular/common';

export type AccDetails = {
  txnHistory: Transaction[];
  balance: number;
};

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, RouterOutlet, Balance, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, OnDestroy {
  currentBalance!: number;
  txnList!: Transaction[];
  isLoading: boolean = false;
  custAccDetails!: AccDetails;
  private subscriptions: Subscription[] = [];

  constructor(
    private txnService: TransactionService,
    private txnNotiService: TransferNotificationService,
  ) {}

  ngOnInit(): void {
    // this.subscriptions.push(
    //   this.txnNotiService.balance$.subscribe((balance) => {
    //     this.currentBalance = balance;
    //     console.log('===========get Latest val', this.currentBalance);
    //   }),
    // );

    this.isLoading = true;
    this.txnList = this.txnService.getTransactions();
    const txnsStream$ = of(this.txnList);

    // 2. Reference your active balance stream
    const balanceStream$ = this.txnNotiService.balance$;

    // 3. Feed pure streams directly into combineLatest (NO internal subscriptions!)
    this.subscriptions.push(
      combineLatest([balanceStream$, txnsStream$]).subscribe({
        // 4. De-structure the emitted values safely into local variables
        next: ([latestBalance, latestTxnList]) => {
          this.currentBalance = latestBalance;
          this.txnList = latestTxnList;

          // 5. Populate your combined model object layout seamlessly
          this.custAccDetails = {
            balance: latestBalance,
            txnHistory: latestTxnList,
          };
          this.isLoading = false;
          console.log('=========== combineLatest emitted safely!', this.custAccDetails);
        },
        error: (err) => console.error('combineLatest stream failed:', err),
      }),
    );
  }

  onBalanceUpdated(currBalance: number) {
    this.txnNotiService.setCurrentBalance(currBalance);
    console.log('===========set val', currBalance);
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
